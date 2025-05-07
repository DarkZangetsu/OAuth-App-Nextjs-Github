# Next.js GitHub OAuth Application

A simple Next.js application with GitHub OAuth authentication.

## Features

- GitHub login authentication
- Email/password login option
- Protected profile page
- Responsive UI with Tailwind CSS

## Setup GitHub OAuth

1. Create a GitHub OAuth app at GitHub → Settings → Developer settings → OAuth Apps
2. Set Homepage URL: `http://localhost:3000`
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy your Client ID and Client Secret

## Environment Setup

Create a `.env.local` file with:

```
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_key
```

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
/app
  /api
  /login
  /profile
  favicon.ico
  globals.css
  layout.js
  page.js
/components
  /ui
  AuthProvider.jsx
  login-form.jsx
  Navbar.jsx
/lib
  auth.js
  utils.js
```

## Authentication Configuration (lib/auth.js)

The `lib/auth.js` file configures the authentication system using NextAuth.js:

### Code Overview

```javascript
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
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Test user authentication logic
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
      // Add user data to JWT token
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
      // Make user data available in session
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session; 
    },
  },
  pages: {
    signIn: '/login'
  }
};

// Export handlers and helper functions
export const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
export const auth = NextAuth(authConfig);
export const signIn = nextAuthSignIn;
export const signOut = nextAuthSignOut;
```

### Authentication Providers

- **GitHub Provider**: Enables OAuth login through GitHub accounts
- **Credentials Provider**: Supports traditional email/password login
  - Currently configured with a test user: user@example.com / password

### Adding Google Authentication

To add Google authentication, follow these steps:

1. Create OAuth credentials in the Google Cloud Console
2. Add the following environment variables to `.env.local`:
   ```
   GOOGLE__CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```
3. Import the Google provider in `lib/auth.js`:
   ```javascript
   import Google from "next-auth/providers/google";
   ```
4. Add the Google provider to the providers array:
   ```javascript
   providers: [
     Github({
       clientId: process.env.GITHUB_CLIENT_ID,
       clientSecret: process.env.GITHUB_CLIENT_SECRET,
     }),
     Google({
       clientId: process.env.GOOGLE_CLIENT_ID,
       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     }),
     Credentials({
       // existing credentials config
     })
   ],
   ```

### Authentication Callbacks

- **jwt callback**: Enhances the JWT token with additional user data and access tokens
- **session callback**: Makes user ID and access token available in client-side sessions

### Custom Pages

- Custom login page configured at `/login`

### Exported Functions

- **handler**: API route handlers for NextAuth
- **auth**: NextAuth configuration object
- **signIn/signOut**: Helper functions for authentication actions

### Additional Customization Options

- Implement a real database connection for the Credentials provider
- Add more OAuth providers like Facebook, Twitter, or Apple
- Extend the JWT and session callbacks with additional user permissions
- Configure custom sign-in/sign-out pages and error pages

## Authentication Flow

1. User clicks "Login with GitHub" on the login page
2. After GitHub authorization, user is redirected to their profile page
3. Authentication state is managed by AuthProvider.jsx
4. Protected routes check session status before rendering

## Deployment

Deploy on [Vercel](https://vercel.com/new) and add your environment variables in the Vercel project settings.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)