import { z } from "zod";
import { AnswerSchema } from "./AnswerSchema";

export const QuestionSchema = z.object({
    id: z.number().optional(),
    key: z.number().optional(),
    nameRu: z.string(),
    nameKz: z.string().optional(),
    multipleAns: z.boolean().optional(),
    required: z.boolean(),
    answers: z.array(AnswerSchema).optional(),
    active: z.boolean().optional(),
});

export type Question = z.infer<typeof QuestionSchema>;