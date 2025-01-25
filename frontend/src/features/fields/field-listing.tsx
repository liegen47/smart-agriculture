"use client";
import { Field } from "@/constant/data";
import { DataTable as FieldTable } from "@/components/ui/table/data-table";
import { columns } from "./fields-table/columns";
import axiosInstance from "@/lib/axios";
import { useState, useEffect } from "react";
import { PaginationState } from "@tanstack/react-table";

export default function FieldListingPage() {
  const [fields, setFields] = useState<Field[]>([]);
  const [totalFields, setTotalFields] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const fetchFields = async (pageIndex: number, pageSize: number) => {
    try {
      const response = await axiosInstance.get("/fields", {
        params: { page: pageIndex + 1, limit: pageSize },
      });
      setFields(response.data.fields);
      setTotalFields(response.data.pagination.totalFields);
    } catch (error) {
      console.error("Error fetching fields:", error);
    }
  };

  const deleteField = (fieldId: string) => {
    setFields((prevFields) =>
      prevFields.filter((field) => field._id !== fieldId)
    );
    setTotalFields((prevTotal) => prevTotal - 1); // Update total count
  };

  useEffect(() => {
    fetchFields(pagination.pageIndex, pagination.pageSize);
  }, [pagination.pageIndex, pagination.pageSize]);

  const handlePaginationChange = (paginationState: PaginationState) => {
    setPagination(paginationState);
  };

  return (
    <FieldTable
      columns={columns(deleteField)}
      data={fields}
      totalItems={totalFields}
      onPaginationChange={handlePaginationChange}
    />
  );
}
