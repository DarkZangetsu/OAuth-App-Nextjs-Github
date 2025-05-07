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