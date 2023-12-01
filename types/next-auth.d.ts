import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user:{
            uid: number;
            profileEmoji: number;
            firstName: string;
            lastName: string;
            apiToken: string;
        } & DefaultSession["user"];
    }
}