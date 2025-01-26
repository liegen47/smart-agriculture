"use client";
import { User } from "@/constant/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns = (
  approveUser: (userId: string) => void
): ColumnDef<User>[] => [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },
  {
    accessorKey: "isApproved",
    header: "APPROVED",
    cell: ({ row }) => {
      const isApproved = row.getValue("isApproved") as boolean;
      return <div>{isApproved ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "clientReferenceId",
    header: "CLIENT REFERENCE ID",
  },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      const date = new Date(createdAt);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "stripeCustomerId",
    header: "STRIPE CUSTOMER ID",
  },
  {
    accessorKey: "subscriptionStatus",
    header: "SUBSCRIPTION STATUS",
  },
  {
    accessorKey: "subscriptionPlanId",
    header: "SUBSCRIPTION PLAN",
    cell: ({ row }) => {
      const subscriptionPlanId = row.getValue("subscriptionPlanId") as
        | string
        | null;

      const getPlanName = (planId: string | null) => {
        if (planId === process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_ID) {
          return "Pro Plan";
        } else if (
          planId === process.env.NEXT_PUBLIC_STRIPE_CUSTOM_PLAN_PRICE_ID
        ) {
          return "Custom Plan";
        } else {
          return "-";
        }
      };

      return <div>{getPlanName(subscriptionPlanId)}</div>;
    },
  },
  {
    accessorKey: "subscriptionStart",
    header: "SUBSCRIPTION START",
    cell: ({ row }) => {
      const subscriptionStart = row.getValue("subscriptionStart") as
        | string
        | null;
      const date = subscriptionStart ? new Date(subscriptionStart) : null;
      return <div>{date ? date.toLocaleDateString() : "-"}</div>;
    },
  },
  {
    accessorKey: "subscriptionEnd",
    header: "SUBSCRIPTION END",
    cell: ({ row }) => {
      const subscriptionEnd = row.getValue("subscriptionEnd") as string | null;
      const date = subscriptionEnd ? new Date(subscriptionEnd) : null;
      return <div>{date ? date.toLocaleDateString() : "-"}</div>;
    },
  },
  {
    accessorKey: "trialEnd",
    header: "TRIAL END",
    cell: ({ row }) => {
      const trialEnd = row.getValue("trialEnd") as string | null;
      const date = trialEnd ? new Date(trialEnd) : null;
      return <div>{date ? date.toLocaleDateString() : "-"}</div>;
    },
  },
  {
    accessorKey: "cancelAtPeriodEnd",
    header: "CANCEL AT PERIOD END",
    cell: ({ row }) => {
      const cancelAtPeriodEnd = row.getValue("cancelAtPeriodEnd") as boolean;
      return <div>{cancelAtPeriodEnd ? "Yes" : "No"}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <CellAction data={row.original} approveUser={approveUser} />
    ),
  },
];
