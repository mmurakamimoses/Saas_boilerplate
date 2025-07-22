import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MarketplacePage() {
  // Directly fetch the session using auth
  const session = await auth.api.getSession({ headers: await headers() });

  // planType and role may or may not be present on session.user
  const planType = (session?.user as any)?.planType || "Unknown";
  const role = (session?.user as any)?.role || "Unknown";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          The marketplace is currently under development.
        </p>
        <div className="text-sm text-gray-500 mb-2">
          Stay tuned for something amazing!
        </div>
        {/* TEST: Show user session info */}
        <div className="mt-4 p-4 bg-gray-100 rounded text-left inline-block">
          <div><b>Session Test (Server, direct auth):</b></div>
          <div>Plan Type: {planType}</div>
          <div>Role: {role}</div>
        </div>
      </div>
    </div>
  );
}
