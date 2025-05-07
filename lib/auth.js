import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";

export const authConfig = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        if (credentials.email === "user@example.com" && credentials.password === "password") {
          return {
            id: "1",
            name: "Utilisateur Test",
            email: "user@example.com"
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account}) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          id: user.id 
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session; 
    },
  },
  pages: {
    signIn: '/login'
  }
};

// Create the auth handlers
const handler = NextAuth(authConfig);

// Export the handlers as named exports
export { handler as GET, handler as POST };

// Export the auth helper functions
export const auth = NextAuth(authConfig);

// Export the signIn and signOut functions
export const signIn = nextAuthSignIn;
export const signOut = nextAuthSignOut;