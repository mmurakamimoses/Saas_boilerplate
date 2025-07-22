import { boolean, pgTable, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";

// Define the plan type enum
export const planTypeEnum = pgEnum('plan_type', ['Free', 'Pro', 'Lifetime']);

export const user = pgTable("user", {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
    image: text('image'),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
    // Admin plugin fields
    role: text('role').$defaultFn(() => "user"),
    banned: boolean('banned').$defaultFn(() => false),
    banReason: text('ban_reason'),
    banExpires: timestamp('ban_expires'),
    // Stripe plugin field
    stripeCustomerId: text('stripe_customer_id'),
    // Plan type field for quick access without table lookups
    planType: planTypeEnum('plan_type').$defaultFn(() => 'Free').notNull()
});

export const session = pgTable("session", {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    // Admin plugin field
    impersonatedBy: text('impersonated_by')
});

export const account = pgTable("account", {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});

export const subscription = pgTable("subscription", {
    id: text('id').primaryKey(),
    plan: text('plan').notNull(),
    referenceId: text('reference_id').notNull(),
    stripeCustomerId: text('stripe_customer_id'),
    stripeSubscriptionId: text('stripe_subscription_id'),
    status: text('status').notNull(),
    periodStart: timestamp('period_start'),
    periodEnd: timestamp('period_end'),
    cancelAtPeriodEnd: boolean('cancel_at_period_end'),
    seats: integer('seats'),
    trialStart: timestamp('trial_start'),
    trialEnd: timestamp('trial_end')
});

export const lifetimeAccess = pgTable("lifetime_access", {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    stripeCustomerId: text('stripe_customer_id'),
    stripePaymentId: text('stripe_payment_id'), // Store the payment intent ID
    stripeSessionId: text('stripe_session_id'), // Store the checkout session ID
    amount: integer('amount').notNull(), // Amount paid in cents
    currency: text('currency').notNull().default('usd'),
    status: text('status').notNull(), // 'active', 'refunded', etc.
    purchasedAt: timestamp('purchased_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const schema = { user, session, account, verification, subscription, lifetimeAccess };
