import { AdminPanel } from "@/components/admin/admin-panel";
import { checkAdminAccess } from "@/lib/access-control";
import { redirect } from "next/navigation";

export default async function Admin() {
  // Check admin access
  const accessResult = await checkAdminAccess();
  
  if (!accessResult.hasAccess && accessResult.redirectUrl) {
    redirect(accessResult.redirectUrl);
  }
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="bg-card p-6 rounded-lg border mb-6">

        </div>

        {/* Admin Panel Demo */}
        <div className="mb-6">
          <AdminPanel />
        </div>
      </div>
    </div>
  );
} 