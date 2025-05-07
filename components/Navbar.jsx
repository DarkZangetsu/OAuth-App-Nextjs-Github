"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";

export default function Navbar({ user }) {
  const router = useRouter();

  return (
    <nav className="w-full max-w-6xl mx-auto p-4 flex justify-between items-center bg-white shadow-md rounded-lg">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          OAuth Github
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        
        {user ? (
          <>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}