import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { Suspense } from "react";
import PageContainer from "@/components/dashboard/layout/page-container";
import FieldListingPage from "@/features/fields/field-listing";

export const metadata = {
  title: "Dashboard: Fields",
};

export default async function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="All Fields"
            description="Manage Fields of all farmers."
          />
        </div>
        <Separator />

        <Suspense
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <FieldListingPage role="admin" />
        </Suspense>
      </div>
    </PageContainer>
  );
}
