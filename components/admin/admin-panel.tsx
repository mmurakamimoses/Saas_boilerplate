"use client";

import { authClient } from "@/lib/auth-client";
import { APITestPanel } from "@/components/api-test-panel";
import { useState } from "react";
import { Button } from "@/components/templates/ui/button";
import { Card } from "@/components/templates/ui/card";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  banned?: boolean | null;
  banReason?: string | null;
  banExpires?: Date | null;
  emailVerified?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface PaginationData {
  users: User[];
  total: number;
  limit: number | undefined;
  offset: number | undefined;
}

export function AdminPanel() {
  const [paginationData, setPaginationData] = useState<PaginationData>({
    users: [],
    total: 0,
    limit: 5,
    offset: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  const fetchUsers = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const offset = (page - 1) * pageSize;
      
      const result = await authClient.admin.listUsers({
        query: {
          limit: pageSize,
          offset: offset,
          sortBy: "createdAt",
          sortDirection: "desc",
        },
      });
      
      // Handle the response properly
      if (result.data) {
        setPaginationData({
          users: Array.isArray(result.data.users) ? result.data.users : (Array.isArray(result.data) ? result.data : []),
          total: result.data.total || 0,
          limit: pageSize,
          offset: offset
        });
        setCurrentPage(page);
      } else {
        setPaginationData({
          users: [],
          total: 0,
          limit: pageSize,
          offset: 0
        });
      }
    } catch (err) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", err);
      setPaginationData({
        users: [],
        total: 0,
        limit: pageSize,
        offset: 0
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate pagination info
  const totalPages = Math.ceil(paginationData.total / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  const goToNextPage = () => {
    if (hasNextPage) {
      fetchUsers(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (hasPreviousPage) {
      fetchUsers(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchUsers(page);
    }
  };

  const formatDate = (date?: string | Date) => {
    if (!date) return "N/A";
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getUserStatusBadge = (user: User) => {
    if (user.banned) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          Banned
        </span>
      );
    }
    if (!user.emailVerified) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          Unverified
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
        Active
      </span>
    );
  };

  const getRoleBadge = (role?: string) => {
    const roleColor = role === "admin" 
      ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${roleColor}`}>
        {role || "user"}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">User Management</h3>
          <Button 
            onClick={() => fetchUsers(1)} 
            disabled={loading}
            variant="outline"
          >
            {loading ? "Loading..." : "Refresh Users"}
          </Button>
        </div>
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {/* Users Table */}
        {paginationData.users.length > 0 ? (
          <div className="space-y-4">
            {/* Table Header */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-muted-foreground">User</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Role</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Created</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {paginationData.users.map((user, index) => (
                    <tr key={user.id} className={`border-b hover:bg-muted/50 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                      <td className="p-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                          <span className="text-xs text-muted-foreground font-mono">ID: {user.id.slice(0, 8)}...</span>
                        </div>
                      </td>
                      <td className="p-3">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col space-y-1">
                          {getUserStatusBadge(user)}
                          {user.banned && user.banReason && (
                            <span className="text-xs text-muted-foreground">
                              Reason: {user.banReason}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(user.createdAt)}
                          </span>
                          {user.updatedAt && user.updatedAt !== user.createdAt && (
                            <span className="text-xs text-muted-foreground">
                              Updated: {formatDate(user.updatedAt)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col text-xs text-muted-foreground">
                          <span>Email: {user.emailVerified ? "✓ Verified" : "✗ Unverified"}</span>
                          {user.banExpires && (
                            <span>Ban expires: {formatDate(user.banExpires)}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>
                  Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, paginationData.total)} of {paginationData.total} users
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={!hasPreviousPage || loading}
                >
                  Previous
                </Button>
                
                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNumber = i + 1;
                    const isCurrentPage = pageNumber === currentPage;
                    
                    return (
                      <Button
                        key={pageNumber}
                        variant={isCurrentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(pageNumber)}
                        disabled={loading}
                        className="w-8 h-8 p-0"
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <>
                      <span className="text-muted-foreground">...</span>
                      <Button
                        variant={currentPage === totalPages ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(totalPages)}
                        disabled={loading}
                        className="w-8 h-8 p-0"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={!hasNextPage || loading}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        ) : (
          !loading && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No users found. Click &quot;Refresh Users&quot; to load users.</p>
            </div>
          )
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-muted-foreground">Loading users...</span>
            </div>
          </div>
        )}
      </Card>

      {/* API Test Section */}
      <APITestPanel />
    </div>
  );
} 