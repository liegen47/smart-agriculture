// import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
// import { cn } from "@/lib/utils";
// import { Plus } from "lucide-react";
// import Link from "next/link";
import { Suspense } from "react";
import PageContainer from "@/components/dashboard/layout/page-container";

interface EntityTablePageProps {
  title: string;
  description: string;
  //   addButtonLabel: string;
  //   addButtonHref: string;
  children: React.ReactNode;
}

export function EntityTablePage({
  title,
  description,
  //   addButtonLabel,
  //   addButtonHref,
  children,
}: EntityTablePageProps) {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={title} description={description} />
          {/* <Link
            href={addButtonHref}
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <Plus className="mr-2 h-4 w-4" /> {addButtonLabel}
          </Link> */}
        </div>
        <Separator />

        <Suspense
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          {children}
        </Suspense>
      </div>
    </PageContainer>
  );
}
