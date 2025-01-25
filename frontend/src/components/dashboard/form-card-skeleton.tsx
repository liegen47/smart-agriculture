import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function FieldFormSkeleton() {
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <Skeleton className="h-8 w-48" /> {/* Title */}
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Field Name */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            <Skeleton className="h-10 w-full" /> {/* Input */}
          </div>

          {/* Location (Latitude and Longitude) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Latitude */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>

            {/* Longitude */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>
          </div>

          {/* Crop Type (Multi-select) */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" /> {/* Label */}
            <Skeleton className="h-10 w-full" /> {/* Select */}
            <div className="mt-2 flex flex-wrap gap-2">
              {/* Selected crop types */}
              <Skeleton className="h-6 w-16 rounded-full" /> {/* Chip */}
              <Skeleton className="h-6 w-16 rounded-full" /> {/* Chip */}
            </div>
          </div>

          {/* Area Size */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            <Skeleton className="h-10 w-full" /> {/* Input */}
          </div>

          {/* Submit Button */}
          <Skeleton className="h-10 w-28" />
        </div>
      </CardContent>
    </Card>
  );
}
