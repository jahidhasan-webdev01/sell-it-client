import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.DB_URI);
const db = client.db("sell-it");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false
    },
    user: {
        additionalFields: {
            role: {
                type: "string"
            },
            phone: {
                type: "string"
            },
            location: {
                type: "string"
            },
            status: {
                type: "string"
            }
        }
    }
});