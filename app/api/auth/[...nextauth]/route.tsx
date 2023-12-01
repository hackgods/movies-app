import NextAuth from "next-auth"
import type { AuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { userLogin } from "@/utils/apiUtils"
import { authOptions } from "./options"




const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


