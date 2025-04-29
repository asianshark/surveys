import { z } from "zod";
import { QuestionSchema } from "./QuestionSchema";
import { DivisionSchema } from "./SettingsSchema";

export const SurveySchema = z.object({
    id: z.number().optional(),
    nameRu: z.string(),
    description: z.string().optional(),
    nameKz: z.string().optional(),
    authorId: z.string().optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "CLOSED"]).optional(),
    type: z.boolean().optional(),
    everyDay: z.boolean().optional(),
    everyWeek: z.boolean().optional(),
    everyMonth: z.boolean().optional(),
    dayOfWeek: z.enum([
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
    ]).optional(),
    questions: z.array(QuestionSchema),
    divisions: z.array(DivisionSchema).optional(),
});

export type Survey = z.infer<typeof SurveySchema>;