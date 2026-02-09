import express from "express";
import { AppDataSource } from "./database";
import { env } from "./config/env";
import routes from "./routes/indexRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Servidor rodando na porta ${env.port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco:", error);
  });
