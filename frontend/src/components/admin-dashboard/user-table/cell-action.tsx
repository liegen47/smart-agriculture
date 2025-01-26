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
import { User } from "@/constant/data";
import adminAxiosInstance from "@/lib/admin-axios";
import { BadgeCheck, MoreHorizontal } from "lucide-react";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CellActionProps {
  data: User;
  approveUser: (userId: string) => void;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
  approveUser,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  //   const router = useRouter();

  const onConfirm = async () => {
    try {
      setLoading(true);
      await adminAxiosInstance.patch(`/admin/farmers/${data._id}/approve`, {
        isApproved: !data.isApproved,
      });
      toast.success("Farmer Approved successfully.");
      approveUser(data._id);
    } catch (error) {
      console.error("Error approving Farmer:", error);
      toast.error("Error Approving Farmer.");
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

          {data.role !== "admin" && (
            <DropdownMenuItem
              onClick={() => {
                if (data.isApproved) {
                  toast.error("Already approved.");
                } else {
                  setOpen(true);
                }
              }}
            >
              <BadgeCheck className="mr-2 h-4 w-4" /> Approve
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
