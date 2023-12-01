import { userLogin } from "@/utils/apiUtils";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" }
        },
        async authorize (credentials, req) {
          if (typeof credentials !== "undefined") {
            const res = await userLogin(credentials.email, credentials.password);
            if (typeof res !== "undefined") {
              return { ...res.user, apiToken: res.token }
            } else {
              return null
            }
          } else {
            return null
          }
        }
      })
    ],
    session: { strategy: "jwt" },
    pages: {
      signIn: '/login',
    },
    callbacks: {
      async jwt ({ token, user }) {
        console.log("jwt callback",{ ...token, ...user });
        return { ...token, ...user }
      },
  
      async session({ session, token, user }) {
        console.log("session callback",{ ...session, user: token});
        return { ...session, user: token}
      },
  
  
    },
  }


