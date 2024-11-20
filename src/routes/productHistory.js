import { Router } from "express";
import ProductHistoryController from "../controllers/productHistoryController.js";

const productHistoryRouter = Router();

productHistoryRouter
	.route("/product")
	.get(ProductHistoryController.all)
	.post(ProductHistoryController.create);

export default productHistoryRouter;
