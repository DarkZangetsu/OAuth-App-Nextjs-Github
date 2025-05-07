import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET, 
        }),
    ],

    callbacks: {
        async jwt({ token, user, account}) {
            if ( account && user )  {
                return {
                    ...token,
                    accessToken: account.access_token,
                    id: user.id 
                };
            }

            return token;
        },

        async session ({ session, token }) {
            session.user.id = token.id;
            session.accessToken = token.accessToken;
            return session; 
        },
    },
    pages: {
        signIn: '/login'
    }
})