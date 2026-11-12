import { useState } from "react";
import { loginAdminApi, setAdminSession } from "../../services/adminAuth";
import type { AdminUser } from "../../types/admin";

interface AdminLoginProps {
  onLogin: (admin: AdminUser) => void;
}

function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { token, admin } = await loginAdminApi(email, password);
      // Store session securely in sessionStorage
      setAdminSession(token, admin);
      onLogin(admin);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to sign in as admin";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFAF4]">
      <div className="w-full max-w-md p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#1B4332] mb-2">Kanchan Admin</h1>
            <p className="text-gray-600">Sign in to manage your store</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none"
                placeholder="admin@kanchan.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1B4332] text-white py-3 rounded-lg font-semibold hover:bg-[#143326] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-[#FCFAF4] rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 font-medium mb-1">Default Credentials:</p>
            <p className="text-xs text-gray-500">Email: admin@kanchan.com</p>
            <p className="text-xs text-gray-500">Password: Admin@Kanchan2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
