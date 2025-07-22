//This is a file to test api endpoints at different pages within the webapp.

"use client";

import { useState } from "react";
import { Button } from "@/components/templates/ui/button";

interface APITestPanelProps {
  userType?: "unauthenticated" | "authenticated" | "admin";
  className?: string;
}

interface APITestResult {
  status: number | string;
  statusText: string;
  data: Record<string, unknown>;
}

export function APITestPanel({ className = "" }: APITestPanelProps) {
  const [adminApiTest, setAdminApiTest] = useState<APITestResult | null>(null);
  const [authApiTest, setAuthApiTest] = useState<APITestResult | null>(null);
  const [paidApiTest, setPaidApiTest] = useState<APITestResult | null>(null);
  const [testLoading, setTestLoading] = useState(false);

  const testAllAPIs = async () => {
    try {
      setTestLoading(true);
      setAdminApiTest(null);
      setAuthApiTest(null);
      setPaidApiTest(null);
      
      // Test all three APIs simultaneously
      const [authResponse, adminResponse, paidResponse] = await Promise.all([
        fetch('/api/testing/authenticated', {
          method: 'GET',
          credentials: 'include',
        }),
        fetch('/api/testing/admin', {
          method: 'GET',
          credentials: 'include',
        }),
        fetch('/api/testing/paid_only', {
          method: 'GET',
          credentials: 'include',
        })
      ]);

      // Process auth API response
      try {
        const authData = await authResponse.json();
        setAuthApiTest({
          status: authResponse.status,
          statusText: authResponse.statusText,
          data: authData
        });
      } catch {
        setAuthApiTest({
          status: 'Error',
          statusText: 'Parse Error',
          data: { error: 'Failed to parse response' }
        });
      }

      // Process admin API response
      try {
        const adminData = await adminResponse.json();
        setAdminApiTest({
          status: adminResponse.status,
          statusText: adminResponse.statusText,
          data: adminData
        });
      } catch {
        setAdminApiTest({
          status: 'Error',
          statusText: 'Parse Error',
          data: { error: 'Failed to parse response' }
        });
      }

      // Process paid API response
      try {
        const paidData = await paidResponse.json();
        setPaidApiTest({
          status: paidResponse.status,
          statusText: paidResponse.statusText,
          data: paidData
        });
      } catch {
        setPaidApiTest({
          status: 'Error',
          statusText: 'Parse Error',
          data: { error: 'Failed to parse response' }
        });
      }
      
    } catch (error: unknown) {
      // Handle network errors
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorData = {
        status: 'Error',
        statusText: 'Network Error',
        data: { error: errorMessage }
      };
      setAuthApiTest(errorData);
      setAdminApiTest(errorData);
      setPaidApiTest(errorData);
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className={`p-4 border rounded-lg ${className}`}>
      <h3 className="text-sm font-semibold mb-3">API Test</h3>
      
      <div className="mb-3">
        <Button 
          onClick={testAllAPIs} 
          disabled={testLoading}
          variant="outline"
          size="sm"
        >
          {testLoading ? "Testing..." : "Test All 3 APIs"}
        </Button>
      </div>

      {(authApiTest || adminApiTest || paidApiTest) && (
        <div className="space-y-3">
          {authApiTest && (
            <div className="p-2 rounded border text-xs">
              <div className="font-medium mb-1">
                🟢 Authenticated Only API - {authApiTest.status} {authApiTest.statusText}
              </div>
              <pre className="text-xs overflow-x-auto">
                {JSON.stringify(authApiTest.data, null, 2)}
              </pre>
            </div>
          )}

          {paidApiTest && (
            <div className="p-2 rounded border text-xs">
              <div className="font-medium mb-1">
                💰 Paid Plan API - {paidApiTest.status} {paidApiTest.statusText}
              </div>
              <pre className="text-xs overflow-x-auto">
                {JSON.stringify(paidApiTest.data, null, 2)}
              </pre>
            </div>
          )}

          {adminApiTest && (
            <div className="p-2 rounded border text-xs">
              <div className="font-medium mb-1">
                👑 Admin Only API - {adminApiTest.status} {adminApiTest.statusText}
              </div>
              <pre className="text-xs overflow-x-auto">
                {JSON.stringify(adminApiTest.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 