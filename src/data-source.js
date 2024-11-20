import { DataSource } from "typeorm";
import "dotenv/config";
import ProductHistorySchema from "./entities/ProductHistorySchema";
import RemainderHistorySchema from "./entities/RemainderHistorySchema.js";

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

const AppDataSource = new DataSource({
	type: "postgres",
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	synchronize: true,
	entities: [ProductHistorySchema, RemainderHistorySchema],
});

export default AppDataSource;
