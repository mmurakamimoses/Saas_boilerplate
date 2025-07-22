"use server";

import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { eq } from "drizzle-orm";

export const signIn = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })

        return {
            success: true,
            message: "Signed in successfully."
        }
    } catch (error) {
        const e = error as Error

        return {
            success: false,
            message: e.message || "An unknown error occurred."
        }
    }
}

export const signUp = async (email: string, password: string, username: string) => {
    console.log("🔍 [SIGNUP] Starting signup process");
    console.log("📝 [SIGNUP] User data:", { email, username });
    
    try {
        console.log("📡 [SIGNUP] Calling Better Auth signUpEmail API");
        const result = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: username,
                callbackURL: "/dashboard"
            }
        })
        
        console.log("✅ [SIGNUP] Signup successful:", result);

        return {
            success: true,
            message: "Signed up successfully."
        }
    } catch (error) {
        const e = error as Error
        console.error("❌ [SIGNUP] Signup failed:", error);
        console.error("❌ [SIGNUP] Error message:", e.message);

        return {
            success: false,
            message: e.message || "An unknown error occurred."
        }
    }
}

export const forgetPassword = async (email: string) => {
    console.log("🔍 [FORGET PASSWORD] Starting forget password process");
    console.log("📧 [FORGET PASSWORD] Email:", email);
    
    try {
        // First, check if user exists and if their email is verified
        console.log("🔍 [FORGET PASSWORD] Checking user verification status");
        const [user] = await db.select().from(schema.user).where(eq(schema.user.email, email)).limit(1);
        
        if (user && !user.emailVerified) {
            console.log("❌ [FORGET PASSWORD] User exists but email is not verified");
            return {
                success: false,
                message: "You must verify your email before resetting your password.",
                needsVerification: true
            };
        }
        // Capture Better Auth's console logs to detect "User not found" errors
        let userNotFoundDetected = false;
        const originalConsoleLog = console.log;
        
        // Override console methods to detect Better Auth's "User not found" messages
        const originalMethods = {
            log: console.log,
            error: console.error,
            warn: console.warn
        };
        
        const interceptConsole = (...args: any[]) => {
            const message = args.join(' ');
            if (message.includes('Reset Password: User not found') || 
                message.includes('User not found')) {
                userNotFoundDetected = true;
            }
            return message;
        };
        
        console.log = (...args: any[]) => {
            interceptConsole(...args);
            originalMethods.log(...args);
        };
        
        console.error = (...args: any[]) => {
            interceptConsole(...args);
            originalMethods.error(...args);
        };
        
        console.warn = (...args: any[]) => {
            interceptConsole(...args);
            originalMethods.warn(...args);
        };
        
        try {
            await auth.api.forgetPassword({
                body: {
                    email,
                    redirectTo: "/reset-password"
                }
            });
        } finally {
            // Restore original console methods
            console.log = originalMethods.log;
            console.error = originalMethods.error;
            console.warn = originalMethods.warn;
        }
        
        // Small delay to ensure all console messages are processed
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (userNotFoundDetected) {
            console.log("❌ [FORGET PASSWORD] User not found detected from Better Auth logs");
            return {
                success: false,
                message: "The email you entered is not associated with an existing account."
            };
        }
        
        console.log("✅ [FORGET PASSWORD] Password reset email sent successfully");
        return {
            success: true,
            message: "Password reset email sent successfully! The link will expire in 15 minutes."
        };
        
    } catch (error) {
        const e = error as Error;
        console.error("❌ [FORGET PASSWORD] Exception:", error);
        
        return {
            success: false,
            message: e.message || "An unknown error occurred."
        };
    }
};

export const resetPassword = async (newPassword: string, token: string) => {
    console.log("🔍 [RESET PASSWORD] Starting password reset process");
    console.log("🔑 [RESET PASSWORD] Token received:", token ? "Present" : "Missing");
    
    try {
        console.log("📡 [RESET PASSWORD] Calling Better Auth resetPassword API");
        await auth.api.resetPassword({
            body: {
                newPassword,
                token
            }
        });
        
        console.log("✅ [RESET PASSWORD] Password reset successful");
        return {
            success: true,
            message: "Password reset successfully."
        };
        
    } catch (error) {
        const e = error as Error;
        console.error("❌ [RESET PASSWORD] Password reset failed:", error);
        console.error("❌ [RESET PASSWORD] Error message:", e.message);
        
        return {
            success: false,
            message: e.message || "An unknown error occurred."
        };
    }
};

export const resendVerificationEmail = async (email: string) => {
    console.log("🔍 [RESEND VERIFICATION] Starting resend verification process");
    console.log("📧 [RESEND VERIFICATION] Email:", email);
    
    try {
        console.log("📡 [RESEND VERIFICATION] Calling Better Auth sendVerificationEmail API");
        await auth.api.sendVerificationEmail({
            body: {
                email,
                callbackURL: "/dashboard"
            }
        });
        
        console.log("✅ [RESEND VERIFICATION] Verification email sent successfully");
        return {
            success: true,
            message: "Verification email sent successfully! The link will expire in 15 minutes."
        };
        
    } catch (error) {
        const e = error as Error;
        console.error("❌ [RESEND VERIFICATION] Failed to send verification email:", error);
        console.error("❌ [RESEND VERIFICATION] Error message:", e.message);
        
        return {
            success: false,
            message: e.message || "Failed to send verification email"
        };
    }
};

