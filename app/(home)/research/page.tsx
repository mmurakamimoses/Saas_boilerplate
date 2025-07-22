import { checkResearchAccess } from "@/lib/access-control";
import { redirect } from "next/navigation";

export default async function ResearchPage() {
  // Check research access (requires paid plan or admin)
  const accessResult = await checkResearchAccess();
  
  if (!accessResult.hasAccess && accessResult.redirectUrl) {
    redirect(accessResult.redirectUrl);
  }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Coming Soon
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            The research page is currently under development.
          </p>
          <div className="text-sm text-gray-500">
            Stay tuned for something amazing!
          </div>
        </div>
      </div>
    )
  }
  