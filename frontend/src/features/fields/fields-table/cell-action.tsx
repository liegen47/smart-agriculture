"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field } from "@/constant/data";
import axiosInstance from "@/lib/axios";
import { ChartArea, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CellActionProps {
  data: Field;
  role: "admin" | "farmer";
  deleteField: (fieldId: string) => void;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
  deleteField,
  role,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    try {
      setLoading(true);

      await axiosInstance.delete(`/fields/${data._id}`);

      toast.success("Field deleted successfully.");
      deleteField(data._id);
    } catch (error) {
      console.error("Error deleting field:", error);
      toast.error("Failed to delete field.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `${role === "admin" ? "/admin" : ""}/dashboard/fields/${
                  data._id
                }/analytics`
              )
            }
          >
            <ChartArea className="mr-2 h-4 w-4" />
            View Analytics
          </DropdownMenuItem>
          {role === "farmer" && (
            <>
              <DropdownMenuItem
                onClick={() => router.push(`/dashboard/fields/${data._id}`)}
              >
                <Edit className="mr-2 h-4 w-4" /> Update
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
