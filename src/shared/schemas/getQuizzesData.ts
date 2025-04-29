import { z } from "zod";
import { QuizSchema } from "../../entities/SurveysTests/Quiz/QuizSchema";

export const GetQuizzesParamsSchema = z.object({
    page: z.number(),
    size: z.number().optional(),
});

export const GetQuizzesSchema = z.object({
    content: z.array(QuizSchema),
    totalElements: z.number(),
}
)
export type GetQuizzesResponse = z.infer<typeof GetQuizzesSchema>;

export type GetQuizzesParams = z.infer<typeof GetQuizzesParamsSchema>;