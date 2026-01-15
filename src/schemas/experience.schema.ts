import { z } from "zod";

export const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(), // If null, it means "Present"
  current: z.boolean().default(false), // Logic helper
  description: z.string().optional(),
}).refine((data) => {
  if (!data.current && !data.endDate) {
    return false; // Must have end date if not current
  }
  if (data.endDate && data.endDate < data.startDate) {
    return false; // End date cannot be before start date
  }
  return true;
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});