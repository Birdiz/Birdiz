export interface EnvConfig {
  port: number;
  mongoUrl: string;
  corsOrigin: string;
}

export const env: EnvConfig = {
  port: Number(process.env.PORT || 4000),
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/birdiz",
  corsOrigin: process.env.CORS_ORIGIN || "*",
};
