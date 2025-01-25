import FormCardSkeleton from "@/components/dashboard/form-card-skeleton";
import PageContainer from "@/components/dashboard/layout/page-container";
import { Suspense } from "react";
import { getDataById } from "@/lib/server-side-axios";
import {
  AnalyticsComponent,
  AnalyticsData,
} from "@/features/analytics/analytics-component";
import { Field } from "@/features/fields/field-form";

export const metadata = {
  title: "Dashboard : Field Analytics",
};

type PageProps = { params: Promise<{ id: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  const field = await getDataById<Field>("fields", params.id);
  const data = (await getDataById<AnalyticsData>(
    `fields/${params.id}`,
    "analyze",
    "POST"
  )) || {
    soilHealth: "Fair",
    cropHealth: "Fair",
    yieldTrends: [],
    recommendations: [],
  };

  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <AnalyticsComponent data={data} field={field} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
