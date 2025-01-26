"use client";
import { User } from "@/constant/data";
import { DataTable as UserTable } from "@/components/ui/table/data-table";
import { columns } from "./columns";
import { useState, useEffect, useCallback } from "react";
import { PaginationState } from "@tanstack/react-table";
import adminAxiosInstance from "@/lib/admin-axios";

export default function UserListingPage({ endpoint }: { endpoint: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const fetchUsers = useCallback(
    async (pageIndex: number, pageSize: number) => {
      try {
        const response = await adminAxiosInstance.get(endpoint, {
          params: { page: pageIndex + 1, limit: pageSize },
        });
        setUsers(response.data.users);
        setTotalUsers(response.data.pagination.totalUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    [endpoint]
  );

  const approveUser = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, isApproved: !user.isApproved } : user
      )
    );
  };

  useEffect(() => {
    fetchUsers(pagination.pageIndex, pagination.pageSize);
  }, [pagination.pageIndex, pagination.pageSize, fetchUsers]);

  const handlePaginationChange = (paginationState: PaginationState) => {
    setPagination(paginationState);
  };
  return (
    <UserTable
      columns={columns(approveUser)}
      data={users}
      totalItems={totalUsers}
      onPaginationChange={handlePaginationChange}
    />
  );
}
