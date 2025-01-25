import FormCardSkeleton from "@/components/dashboard/form-card-skeleton";
import PageContainer from "@/components/dashboard/layout/page-container";
import FieldViewPage from "@/features/fields/field-view-page";
import { Suspense } from "react";

export const metadata = {
  title: "Dashboard : Field View",
};

type PageProps = { params: Promise<{ id: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <FieldViewPage fieldId={params.id} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
