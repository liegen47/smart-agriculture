"use client";
import { Field } from "@/constant/data";
import { DataTable as FieldTable } from "@/components/ui/table/data-table";
import { columns } from "./fields-table/columns";
import axiosInstance from "@/lib/axios";
import adminAxiosInstance from "@/lib/admin-axios";
import { useState, useEffect, useCallback } from "react";
import { PaginationState } from "@tanstack/react-table";

interface FieldListingPageProps {
  role: "admin" | "farmer";
}

export default function FieldListingPage({ role }: FieldListingPageProps) {
  const [fields, setFields] = useState<Field[]>([]);
  const [totalFields, setTotalFields] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const axios = role === "admin" ? adminAxiosInstance : axiosInstance;
  const fetchFields = useCallback(
    async (pageIndex: number, pageSize: number) => {
      try {
        const endpoint = role === "admin" ? "/admin/fields" : `/fields`;
        const response = await axios.get(endpoint, {
          params: { page: pageIndex + 1, limit: pageSize },
        });
        setFields(response.data.fields);

        setTotalFields(response.data.pagination.totalFields);
      } catch (error) {
        console.error("Error fetching fields:", error);
      }
    },
    [role, axios]
  );

  const deleteField = (fieldId: string) => {
    setFields((prevFields) =>
      prevFields.filter((field) => field._id !== fieldId)
    );
    setTotalFields((prevTotal) => prevTotal - 1);
  };

  useEffect(() => {
    fetchFields(pagination.pageIndex, pagination.pageSize);
  }, [pagination.pageIndex, pagination.pageSize, fetchFields]);

  const handlePaginationChange = (paginationState: PaginationState) => {
    setPagination(paginationState);
  };

  return (
    <FieldTable
      columns={columns(deleteField, role)}
      data={fields}
      totalItems={totalFields}
      onPaginationChange={handlePaginationChange}
    />
  );
}
