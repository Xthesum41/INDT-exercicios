import "dotenv/config";

export const env = {
  port: Number(process.env.PORT ?? 3000),
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    synchronize: String(process.env.DB_SYNCHRONIZE ?? "true") === "true",
  },
};
