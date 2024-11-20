import "dotenv/config";
import "reflect-metadata";
import express from "express";
import apiRouter from "./routes/api.js";
import AppDataSource from "./data-source.js";

const app = express();
const PORT = process.env.APP_HISTORY_POST;

app.use(express.json());
app.use("/api", apiRouter);
app.use("*", (req, res) => {
	res.status(500).json({ message: "Bad request" });
});

AppDataSource.initialize()
	.then(async () => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((e) => console.log(e));
