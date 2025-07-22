import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-06-30.basil",
});

export async function POST(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { successUrl, cancelUrl } = await request.json();

        // Get or create Stripe customer
        let stripeCustomerId = session.user.stripeCustomerId;
        
        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: session.user.email,
                name: session.user.name,
                metadata: {
                    userId: session.user.id,
                },
            });
            
            stripeCustomerId = customer.id;
            
            // Update user with Stripe customer ID
            await db.update(user)
                .set({ stripeCustomerId })
                .where(eq(user.id, session.user.id));
        }

        // Create checkout session for one-time payment
        console.log(`🔍 [LIFETIME CHECKOUT] Creating checkout session for user ${session.user.id}`);
        const checkoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: process.env.STRIPE_LIFETIME_PRICE_ID!,
                    quantity: 1,
                },
            ],
            mode: 'payment', // One-time payment, not subscription
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                userId: session.user.id,
                type: 'lifetime_access',
            },
        });
        
        console.log(`✅ [LIFETIME CHECKOUT] Checkout session created:`, {
            id: checkoutSession.id,
            mode: checkoutSession.mode,
            metadata: checkoutSession.metadata,
            url: checkoutSession.url
        });

        return NextResponse.json({ url: checkoutSession.url });

    } catch (error) {
        console.error("Lifetime checkout error:", error);
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
} 