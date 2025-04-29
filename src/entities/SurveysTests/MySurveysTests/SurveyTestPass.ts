import { z } from 'zod';

const Result = z.object({
    userId: z.string(),
    attemptNumber: z.number(),
    percentage: z.number(),
    totalQuestions: z.number(),
    correctAnswers: z.number(),
    finishedAt: z.string(),
    questionResults: z.object({
        questionId: z.number().array(),
        selectedAnswers: z.number().array(),
        correctAnswers: z.number().array(),
        correct: z.boolean(),
    }).array()
})
export type Result = z.infer<typeof Result>