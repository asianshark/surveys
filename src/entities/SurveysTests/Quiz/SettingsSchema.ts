import { z } from "zod";

export const SettingsSchema = z.object({
    type: z.boolean(),
    divisions: z.object({
        divisionName: z.string(),
        quisIds: z.array(z.number()),
    }),
});
export type Settings = z.infer<typeof SettingsSchema>;

export const DivisionSchema = z.object({
    id: z.number().optional(),
    divisionName: z.string().optional(), // string | undefined
    quizIds: z.array(z.number()).optional(), // number[] | null | undefined
});
export type Division = z.infer<typeof DivisionSchema>;

export const JurisdictionSchema = z.object({
    division: DivisionSchema.optional(), // Division | undefined
    jurisdiction: z.string().optional(), // string | undefined
    officialPosition: z.string().optional(), // string | undefined
    users: z.array(z.string()).optional(), // string[] | undefined
});
export type Jurisdiction = z.infer<typeof JurisdictionSchema>;
