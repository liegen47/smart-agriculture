"use client";
import FormCardSkeleton from "@/components/dashboard/form-card-skeleton";
import PageContainer from "@/components/dashboard/layout/page-container";
import { ProfileForm } from "@/features/profile/profile-form";
import { Suspense } from "react";
import { ProfileFormValues } from "@/features/profile/profile-form-schema";
import { useUser } from "@/context/user-context";

export default function Page() {
  const { user } = useUser();

  const profileData: ProfileFormValues = {
    name: user?.name || "",
    email: user?.email || "",
    dateOfBirth: "2003-02-07",
    gender: "male" as const,
    phoneNumber: "7006840318",
  };

  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <ProfileForm initialData={profileData} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
