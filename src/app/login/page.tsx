'use client';

import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { user, login } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      {/* Example login form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login("test@example.com", "password123"); // replace with real input
        }}
        className="flex flex-col gap-4 w-80"
      >
        <input
          type="email"
          placeholder="Email"
          className="p-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border rounded"
          required
        />
        <button
          type="submit"
          className="p-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Log In
        </button>
      </form>

      {user && (
        <p className="mt-4 text-green-600">
          Logged in as <strong>{user.email}</strong>
        </p>
      )}
    </div>
  );
}
