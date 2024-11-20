import express from "express";
import productHistoryRouter from "./productHistory.js";
import remainderHistoryRouter from "./remainderHistory.js";

const apiRouter = express.Router();

apiRouter.all("*", [productHistoryRouter, remainderHistoryRouter]);

export default apiRouter;
