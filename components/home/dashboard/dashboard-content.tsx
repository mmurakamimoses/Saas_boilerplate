import { APITestPanel } from "@/components/api-test-panel";
import { SubscriptionButtons } from "@/components/home/dashboard/subscription-buttons";
import { SubscriptionManager } from "@/components/home/dashboard/subscription-manager";
import UserInfo from "./UserInfo";

export function DashboardContent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      </div>
      <UserInfo />

      <SubscriptionButtons />

      {/* Subscription Management for Pro Users */}
      <SubscriptionManager />

      {/* API Test Section */}
      <APITestPanel 
        userType="authenticated" 
        className="mt-4 max-w-md w-full"
      />
    </div>
  );
} 