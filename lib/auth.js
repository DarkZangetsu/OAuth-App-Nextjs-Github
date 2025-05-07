import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";

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

// Export the auth helper
export const { auth, signIn, signOut } = NextAuth(authConfig);