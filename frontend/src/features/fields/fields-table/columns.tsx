"use client";
import { Field } from "@/constant/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns = (
  deleteField: (fieldId: string) => void
): ColumnDef<Field>[] => [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "cropTypes",
    header: "CROP TYPES",
    cell: ({ row }) => {
      const cropTypes = row.getValue("cropTypes") as [];
      return <div>{cropTypes.join(", ")}</div>;
    },
  },
  {
    accessorKey: "location",
    header: "LOCATION",
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
    header: "AREA SIZE",
    cell: ({ row }) => {
      const areaSize = row.getValue("areaSize") as number;
      return <div>{areaSize} ha</div>;
    },
  },
  {
    accessorKey: "soilHealth",
    header: "SOIL HEALTH",
  },
  {
    accessorKey: "cropHealth",
    header: "CROP HEALTH",
  },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return <div>{new Date(createdAt).toLocaleDateString()}</div>; // Format the date
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <CellAction data={row.original} deleteField={deleteField} />
    ), // Pass deleteField to CellAction
  },
];
