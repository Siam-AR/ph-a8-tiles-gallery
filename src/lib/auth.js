import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoUri);
const db = client.db("pixgen");

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const appUrl =
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// Ensure the MongoDB client is connected
async function getConnectedClient() {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
      console.log("MongoDB connected successfully");
    }
    return client;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export const auth = betterAuth({
  baseURL: appUrl,
  secret: process.env.BETTER_AUTH_SECRET ?? "development-secret-key-development-secret-key",
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: {
    enabled: true,
    autoSignInAfterSignUp: true,
  },
  socialProviders: googleClientId && googleClientSecret ? {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret
    }
  } : {},
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAgeUntil: 60 * 60 * 24,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    }
  }
});

// Initialize connection
getConnectedClient().catch(console.error);