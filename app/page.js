"use client";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const user = session?.user || null;

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Navbar user={user} />
      
      <div className="max-w-4xl w-full mt-16 text-center">
        <h1 className="text-4xl font-bold mb-6">OAuth GitHub Nextjs</h1>
        
        {isLoading ? (
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p>Loading...</p>
          </div>
        ) : user ? (
          <div className="bg-green-100 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}!</h2>
            <p className="mb-4">You are successfully authenticated via GitHub OAuth.</p>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="bg-blue-100 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Hello, visitor!</h2>
            <p className="mb-4">Please sign in to access the full features of this app.</p>
            <button
              onClick={() => router.push('/login')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Sign In
            </button>
          </div>
        )}
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Features of this OAuth App:</h3>
          <ul className="list-disc text-left ml-8">
            <li>Authentication with GitHub OAuth</li>
            <li>JWT token handling for session management</li>
            <li>Protected routes requiring authentication</li>
            <li>User profile display with GitHub information</li>
          </ul>
        </div>
      </div>
    </main>
  );
}