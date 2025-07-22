import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';
import { user, account } from "@/db/schema";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// Load environment variables
config({ path: ".env" });

// Initialize database connection
const db = drizzle(process.env.DATABASE_URL!);

// Fake data arrays
const firstNames = [
  "Alex", "Jamie", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", 
  "Quinn", "Sage", "Blake", "Drew", "Emery"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", 
  "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez"
];

const domains = [
  "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", 
  "protonmail.com", "aol.com", "zoho.com"
];

// Function to generate a random date within the last 6 months
function getRandomDate() {
  const now = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  
  const randomTime = sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime());
  return new Date(randomTime);
}

// Function to generate fake user data
function generateUser(index: number) {
  const firstName = firstNames[index];
  const lastName = lastNames[index];
  const name = `${firstName} ${lastName}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[index % domains.length]}`;
  const createdAt = getRandomDate();
  const updatedAt = new Date(createdAt.getTime() + Math.random() * (new Date().getTime() - createdAt.getTime()));
  
  return {
    id: uuidv4(),
    name,
    email,
    emailVerified: true,
    role: index === 0 ? "admin" : "user", // First user is admin, rest are users
    banned: false,
    banReason: null,
    banExpires: null,
    stripeCustomerId: null,
    createdAt,
    updatedAt
  };
}

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");
    console.log("📝 Creating 13 users (1 admin + 12 regular users)...");

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await db.delete(account);
    // await db.delete(user);
    // console.log("🗑️ Cleared existing data");

    const users = [];
    const accounts = [];
    
    // Generate all users and accounts
    for (let i = 0; i < 13; i++) {
      const userData = generateUser(i);
      
      // Hash a default password for all users
      const hashedPassword = await bcrypt.hash("Password123!", 12);
      
      // Create user record
      users.push(userData);
      
      // Create corresponding account record
      accounts.push({
        id: uuidv4(),
        accountId: userData.id,
        providerId: "credentials",
        userId: userData.id,
        password: hashedPassword,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt
      });
      
      console.log(`👤 Generated: ${userData.name} (${userData.email}) - Role: ${userData.role}`);
    }

    // Insert all users
    console.log("💾 Inserting users into database...");
    const createdUsers = await db.insert(user).values(users).returning();
    console.log(`✅ Created ${createdUsers.length} users`);

    // Insert all accounts
    console.log("🔐 Inserting account credentials...");
    const createdAccounts = await db.insert(account).values(accounts).returning();
    console.log(`✅ Created ${createdAccounts.length} account records`);

    // Summary
    console.log("\n📊 Seeding Summary:");
    console.log(`👑 Admin users: ${createdUsers.filter(u => u.role === 'admin').length}`);
    console.log(`👤 Regular users: ${createdUsers.filter(u => u.role === 'user').length}`);
    console.log(`📧 All emails verified: ${createdUsers.every(u => u.emailVerified)}`);
    console.log(`🔑 Default password for all users: "Password123!"`);
    
    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📋 Login Credentials:");
    createdUsers.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.email} / Password123! (${user.role})`);
    });
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase(); 