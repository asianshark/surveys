import { z } from "zod";

export const CalendarSchema = z.object({
  startDate: z.string().min(1, "Start date is required"), // Можно добавить regex для ISO-даты
  endDate: z.string().min(1, "End date is required"),
  everyDay: z.boolean(),
  everyWeek: z.boolean(),
  everyMonth: z.boolean(),
  dayOfWeek: z
    .enum([
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ])
    .optional(),
});

export type Calendar = z.infer<typeof CalendarSchema>;