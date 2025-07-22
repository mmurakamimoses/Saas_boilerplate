import { DashboardContent } from "@/components/home/dashboard/dashboard-content";
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
