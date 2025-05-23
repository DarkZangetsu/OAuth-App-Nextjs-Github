"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user;
  const loading = status === "loading";

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === "unauthenticated") {
      router.push('/login');
    }
  }, [status, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <p>Loading profile...</p>
      </div>
    );
  }

  // Additional safeguard against rendering profile when not authenticated
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Navbar user={user} />
      
      <div className="max-w-2xl w-full mt-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            {user.image && (
              <img 
                src={user.image} 
                alt="Profile picture" 
                className="w-16 h-16 rounded-full mr-4" 
              />
            )}
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-2">Account Information</h3>
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Provider:</strong> GitHub</p>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}