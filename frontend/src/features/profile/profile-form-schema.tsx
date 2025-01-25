import { z } from "zod";

// Define the form schema using Zod
export const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  gender: z.enum(["male", "female", "other"]),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
