"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await auth();
      setUser(session?.user || null);
    };
    
    checkAuth();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Navbar user={user} />
      
      <div className="max-w-4xl w-full mt-16 text-center">
        <h1 className="text-4xl font-bold mb-6">OAuth GitHub Nextjs</h1>
        
        {user ? (
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