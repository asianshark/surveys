import { z } from "zod";

const AppEnvSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_NOTIFICATION_WS_URL: z.string(),
  VITE_S3_URL: z.string(),
  MODE: z.string(),
  DEV: z.boolean(),
  PROD: z.boolean(),
  SSR: z.boolean(),
  BASE_URL: z.string(),
});

export const appEnv: ImportMetaEnv = AppEnvSchema.parse(import.meta.env);
