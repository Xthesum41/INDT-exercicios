import express from "express";
import routes from "./routes/index.js";
import { AppDataSource } from "./datasource/index.js";

const app = express();
app.use(express.json());
app.use(routes);

AppDataSource.initialize().then(() => {
	app.listen(3000, () => console.log("Server running on port 3000"));
});
