import { z } from "zod";

export const AnswerSchema = z.object({
    nameRu: z.string(),
    nameKz: z.string(),
    diagramsNameRu: z.string().optional(),
    diagramsNameKz: z.string().optional(),
    noteNameRu: z.string().optional(),
    noteNameKz: z.string().optional(),
    correct: z.boolean().optional(),
    key: z.number(),
    id: z.number().optional(),
});

export type Answer = z.infer<typeof AnswerSchema>;