"use client";
import { Field } from "@/constant/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns = (
  deleteField: (fieldId: string) => void,
  role: "admin" | "farmer"
): ColumnDef<Field>[] => {
  const baseColumns: ColumnDef<Field>[] = [
    {
      accessorKey: "name",
      header: "NAME",
    },
    {
      accessorKey: "cropTypes",
      header: role === "admin" ? "CROP TYPES (Admin View)" : "CROP TYPES",
      cell: ({ row }) => {
        const cropTypes = row.getValue("cropTypes") as [];
        return <div>{cropTypes.join(", ")}</div>;
      },
    },
    {
      accessorKey: "location",
      header: role === "admin" ? "LOCATION (Admin View)" : "LOCATION",
      cell: ({ row }) => {
        const location = row.getValue("location") as {
          latitude: number;
          longitude: number;
        };
        return (
          <div>
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </div>
        );
      },
    },
    {
      accessorKey: "areaSize",
      header: role === "admin" ? "AREA SIZE (Admin View)" : "AREA SIZE",
      cell: ({ row }) => {
        const areaSize = row.getValue("areaSize") as number;
        return <div>{areaSize} ha</div>;
      },
    },
    {
      accessorKey: "soilHealth",
      header: role === "admin" ? "SOIL HEALTH (Admin View)" : "SOIL HEALTH",
    },
    {
      accessorKey: "cropHealth",
      header: role === "admin" ? "CROP HEALTH (Admin View)" : "CROP HEALTH",
    },
    {
      accessorKey: "createdAt",
      header: role === "admin" ? "CREATED AT (Admin View)" : "CREATED AT",
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as string;
        return <div>{new Date(createdAt).toLocaleDateString()}</div>; // Format the date
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <CellAction data={row.original} role={role} deleteField={deleteField} />
      ),
    },
  ];

  if (role === "admin") {
    baseColumns.splice(7, 0, {
      accessorKey: "user.name",
      header: "USER NAME",
      cell: ({ row }) => {
        const userName = row.original.user?.name || "N/A";
        return <div>{userName}</div>;
      },
    });
  }

  return baseColumns;
};
