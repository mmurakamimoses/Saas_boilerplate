import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';
import { user, session, account, verification, subscription } from "@/db/schema";

// Load environment variables
config({ path: ".env" });

// Initialize database connection
const db = drizzle(process.env.DATABASE_URL!);

async function resetDatabase() {
  try {
    console.log("🗑️  Starting database reset...");
    console.log("⚠️  This will permanently delete ALL data from the database!");
    
    // Delete in order to respect foreign key constraints
    // Even though we have cascade deletes, being explicit is safer
    
    console.log("🔄 Deleting sessions...");
    await db.delete(session);
    console.log("✅ Sessions cleared");
    
    console.log("🔄 Deleting accounts...");
    await db.delete(account);
    console.log("✅ Accounts cleared");
    
    console.log("🔄 Deleting verifications...");
    await db.delete(verification);
    console.log("✅ Verifications cleared");
    
    console.log("🔄 Deleting subscriptions...");
    await db.delete(subscription);
    console.log("✅ Subscriptions cleared");
    
    console.log("🔄 Deleting users...");
    await db.delete(user);
    console.log("✅ Users cleared");
    
    console.log("\n🎉 Database reset completed successfully!");
    console.log("📊 All tables have been cleared:");
    console.log("  • Users: 0");
    console.log("  • Sessions: 0");
    console.log("  • Accounts: 0");
    console.log("  • Verifications: 0");
    console.log("  • Subscriptions: 0");
    console.log("\n💡 You can now run 'npm run seed-db' to populate with test data again.");
    
  } catch (error) {
    console.error("❌ Error resetting database:", error);
    process.exit(1);
  }
}

// Run the reset function
resetDatabase(); 