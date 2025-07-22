import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { db } from "@/db/drizzle";
import { lifetimeAccess } from "@/db/schema";
import { syncUserPlanType } from "@/lib/plan-utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-06-30.basil",
});

const { POST: betterAuthHandler } = toNextJsHandler(auth);

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
        console.error("❌ [UNIFIED WEBHOOK] No Stripe signature found");
        return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        // Verify the webhook signature
        event = stripe.webhooks.constructEvent(
            body, 
            signature, 
            process.env.STRIPE_WEBHOOK_SECRET!
        );
        console.log(`🔍 [UNIFIED WEBHOOK] Verified event: ${event.type}`);
    } catch (err) {
        console.error(`❌ [UNIFIED WEBHOOK] Signature verification failed:`, err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle checkout.session.completed events
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        
        console.log(`🔍 [UNIFIED WEBHOOK] Checkout session completed:`, {
            id: session.id,
            mode: session.mode,
            metadata: session.metadata,
        });

        // Check if this is a lifetime access purchase
        if (session.metadata?.type === "lifetime_access" && session.mode === "payment") {
            console.log(`🎯 [UNIFIED WEBHOOK] Processing lifetime access purchase`);
            return await handleLifetimeAccess(session);
        } else {
            console.log(`📝 [UNIFIED WEBHOOK] Processing subscription event via Better Auth`);
            // For subscription events, forward to Better Auth
            return await forwardToBetterAuth(request, body);
        }
    } else {
        console.log(`📝 [UNIFIED WEBHOOK] Processing non-checkout event via Better Auth: ${event.type}`);
        // For all other events (subscription updates, cancellations, etc.), forward to Better Auth
        return await forwardToBetterAuth(request, body);
    }
}

async function handleLifetimeAccess(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.userId;

    if (!userId || !session.payment_intent) {
        console.log(`⚠️ [UNIFIED WEBHOOK] Missing userId or payment_intent:`, { 
            userId, 
            payment_intent: session.payment_intent 
        });
        return NextResponse.json({ error: "Missing required data" }, { status: 400 });
    }

    try {
        console.log(`📝 [UNIFIED WEBHOOK] Creating lifetime access for user ${userId}`);
        
        // Create lifetime access record
        await db.insert(lifetimeAccess).values({
            id: `lifetime_${userId}_${Date.now()}`,
            userId,
            stripeCustomerId: session.customer as string,
            stripePaymentId: session.payment_intent as string,
            stripeSessionId: session.id,
            amount: session.amount_total || 0,
            currency: session.currency || 'usd',
            status: 'active',
        });

        console.log(`✅ [UNIFIED WEBHOOK] Created lifetime access for user ${userId}`);

        // Sync the user's plan type to reflect lifetime access
        try {
            await syncUserPlanType(userId);
            console.log(`✅ [UNIFIED WEBHOOK] Synced plan type for user ${userId}`);
        } catch (error) {
            console.error(`❌ [UNIFIED WEBHOOK] Failed to sync plan type for user ${userId}:`, error);
            // Don't fail the webhook if plan type sync fails
        }

        return NextResponse.json({ received: true });

    } catch (error) {
        console.error(`❌ [UNIFIED WEBHOOK] Failed to create lifetime access for user ${userId}:`, error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

async function forwardToBetterAuth(request: NextRequest, body: string) {
    try {
        // Create a new request with the original body for Better Auth to process
        // We need to construct the Better Auth webhook URL
        const url = new URL(request.url);
        const betterAuthUrl = `${url.protocol}//${url.host}/api/auth/stripe/webhook`;
        
        const newRequest = new NextRequest(betterAuthUrl, {
            method: request.method,
            headers: request.headers,
            body: body,
        });

        console.log(`📡 [UNIFIED WEBHOOK] Forwarding to Better Auth`);
        return await betterAuthHandler(newRequest);
    } catch (error) {
        console.error(`❌ [UNIFIED WEBHOOK] Error forwarding to Better Auth:`, error);
        return NextResponse.json({ error: "Better Auth processing failed" }, { status: 500 });
    }
} 