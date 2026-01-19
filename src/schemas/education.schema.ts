import { z } from "zod";

export const educationSchema = z.object({
  school: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  startDate: z.date(),
  endDate: z.date().optional(),
  current: z.boolean().default(false).optional(),
  description: z.string().optional(),
}).refine((data) => {
  if (!data.current && !data.endDate) {
    return false;
  }
  return true;
}, {
  message: "End date is required unless currently studying",
  path: ["endDate"],
});