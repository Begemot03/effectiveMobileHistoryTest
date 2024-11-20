import { Router } from "express";
import RemainderHistoryController from "../controllers/remainderHistoryController.js";

const remainderHistoryRouter = Router();

remainderHistoryRouter
	.route("/remainder")
	.get(RemainderHistoryController.all)
	.post(RemainderHistoryController.create);

export default remainderHistoryRouter;
