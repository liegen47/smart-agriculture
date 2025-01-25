"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

interface Location {
  latitude: number;
  longitude: number;
}

export interface Field {
  _id?: string;
  name: string;
  location: Location;
  cropTypes: [];
  areaSize: number;
}

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Field name must be at least 2 characters.",
  }),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  cropTypes: z.array(z.string()).min(1, {
    message: "At least one crop type is required.",
  }),
  areaSize: z.number().min(1, {
    message: "Area size must be at least 1.",
  }),
});

export default function FieldForm({
  initialData,
  pageTitle,
  mode = "create",
}: {
  initialData: Field | null;
  pageTitle: string;
  mode?: "create" | "edit";
}) {
  const router = useRouter();
  const defaultValues = {
    name: initialData?.name || "",
    location: initialData?.location || { latitude: 0, longitude: 0 },
    cropTypes: initialData?.cropTypes || [],
    areaSize: initialData?.areaSize || 0,
  };

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let response;
      if (mode === "create") {
        response = await axiosInstance.post("/fields", values);
        toast.success("Field created successfully!");
        router.push("/dashboard/fields");
      } else if (mode === "edit" && initialData?._id) {
        response = await axiosInstance.put(
          `/fields/${initialData._id}`,
          values
        );
        toast.success("Field updated successfully!");
        router.push("/dashboard/fields");
      } else {
        throw new Error("Invalid mode or missing field ID for edit mode.");
      }

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Field Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter field name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location (Latitude and Longitude) */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="location.latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.000001"
                        placeholder="Enter latitude"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        value={field.value ? String(field.value) : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location.longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.000001"
                        placeholder="Enter longitude"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        value={field.value ? String(field.value) : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Crop Type (Multi-select) */}
            <FormField
              control={form.control}
              name="cropTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop Types</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange([...field.value, value])
                    }
                    value=""
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop types" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="corn">Corn</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="soybean">Soybean</SelectItem>
                      <SelectItem value="barley">Barley</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {field.value.map((type, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded bg-gray-100 px-2 py-1 text-sm"
                      >
                        <span>{type}</span>
                        <button
                          type="button"
                          onClick={() =>
                            field.onChange(
                              field.value.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <Icons.close className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Area Size */}
            <FormField
              control={form.control}
              name="areaSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area Size (in hectares)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter area size"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                      value={field.value ? String(field.value) : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit">
              {mode === "create" ? "Create Field" : "Update Field"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
