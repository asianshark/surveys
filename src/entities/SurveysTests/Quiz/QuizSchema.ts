import { z } from "zod";
import { QuestionSchema } from "./QuestionSchema";
import { DivisionSchema } from "./SettingsSchema";

export const QuizSchema = z.object({
    id: z.number(),
    nameRu: z.string(),
    nameKz: z.string(),
    status: z.enum(["DRAFT", "PUBLISHED", "CLOSED"]),
    test: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    authorId: z.string().optional(),
    type: z.boolean(),
    startDate: z.string(),
    endDate: z.string(),
    everyDay: z.boolean(),
    everyWeek: z.boolean(),
    everyMonth: z.boolean(),
    dayOfWeek: z.enum([
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
    ]),
    questions: z.array(QuestionSchema),
    divisions: z.array(DivisionSchema.optional()),
});

export type Quiz = z.infer<typeof QuizSchema>;