import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import ForgotPasswordEmail from "@/components/auth/emails/reset-password";
import VerifyEmail from "@/components/auth/emails/verify-email";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { stripe } from "@better-auth/stripe";
import { Resend } from "resend";
import Stripe from "stripe";
import { syncUserPlanType } from "@/lib/plan-utils";

const resend = new Resend(process.env.RESEND_API_KEY as string);

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-06-30.basil",
});


export const auth = betterAuth({
    user: {
        additionalFields: {
            planType: {
                type: "string",
                required: false,
                defaultValue: "Free",
                input: false, 
            },
        },
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }: { user: any; url: string }) => {

            
            try {
                const result = await resend.emails.send({
                    from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
                    to: user.email,
                    subject: "Verify your email",
                    react: VerifyEmail({ username: user.name, verifyUrl: url }),
                });
                
                console.log("✅ [EMAIL VERIFICATION] Email sent successfully:", result);
            } catch (error) {
                console.error("❌ [EMAIL VERIFICATION] Failed to send email:", error);
                throw error;
            }
        },
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 900, // 15 minutes (15 * 60 = 900 seconds)
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }: { user: any; url: string }) => {
            // Check if user actually exists (this callback is only called if user exists)
            // So if we reach here, the user exists and we should send the email
            try {
                const result = await resend.emails.send({
                    from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
                    to: user.email,
                    subject: "Reset your password",
                    react: ForgotPasswordEmail({ username: user.name, resetUrl: url, userEmail: user.email }),
                });
                
                console.log("✅ [PASSWORD RESET] Email sent successfully:", result);
            } catch (error) {
                console.error("❌ [PASSWORD RESET] Failed to send email:", error);
                throw error;
            }
        },
        requireEmailVerification: true,
        resetPasswordTokenExpiresIn: 900, // 15 minutes (15 * 60 = 900 seconds)
    },
    database: drizzleAdapter(db, {
        provider: "pg", 
        schema,
    }),
    plugins: [
        nextCookies(),
        admin({
            defaultRole: "user",
            adminRoles: ["admin"],
        }),
        stripe({
            stripeClient,
            stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
            createCustomerOnSignUp: false,
            subscription: {
                enabled: true,
                plans: [
                    {
                        name: "pro",
                        priceId: process.env.STRIPE_PRO_PLAN_PRICE_ID!, // You'll need to add this to your env
                    }
                ],
                // Sync planType when subscription is completed
                onSubscriptionComplete: async ({ subscription }) => {
                    try {
                        await syncUserPlanType(subscription.referenceId);
                        console.log(`✅ [SUBSCRIPTION COMPLETE] Synced plan type for user ${subscription.referenceId}`);
                    } catch (error) {
                        console.error("❌ [PLAN SYNC] Failed to sync plan type on subscription complete:", error);
                    }
                },
                // Sync planType when subscription is updated
                onSubscriptionUpdate: async ({ subscription }) => {
                    try {
                        await syncUserPlanType(subscription.referenceId);
                        console.log(`✅ [SUBSCRIPTION UPDATE] Synced plan type for user ${subscription.referenceId}`);
                    } catch (error) {
                        console.error("❌ [PLAN SYNC] Failed to sync plan type on subscription update:", error);
                    }
                },
                // Sync planType when subscription is canceled
                onSubscriptionCancel: async ({ subscription }) => {
                    try {
                        await syncUserPlanType(subscription.referenceId);
                        console.log(`✅ [SUBSCRIPTION CANCEL] Synced plan type for user ${subscription.referenceId}`);
                    } catch (error) {
                        console.error("❌ [PLAN SYNC] Failed to sync plan type on subscription cancel:", error);
                    }
                },
                // Sync planType when subscription is deleted
                onSubscriptionDeleted: async ({ subscription }) => {
                    try {
                        await syncUserPlanType(subscription.referenceId);
                        console.log(`✅ [SUBSCRIPTION DELETED] Synced plan type for user ${subscription.referenceId}`);
                    } catch (error) {
                        console.error("❌ [PLAN SYNC] Failed to sync plan type on subscription deleted:", error);
                    }
                }
            },

        }),
      ],

});