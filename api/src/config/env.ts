import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  MONGO_URL: z.string().min(1).default("mongodb://localhost:27017/birdiz"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
});

const parsed = envSchema.parse(process.env);

export interface EnvConfig {
  port: number;
  mongoUrl: string;
  corsOrigin: string;
}

export const env: EnvConfig = {
  port: parsed.PORT,
  mongoUrl: parsed.MONGO_URL,
  corsOrigin: parsed.CORS_ORIGIN,
};
