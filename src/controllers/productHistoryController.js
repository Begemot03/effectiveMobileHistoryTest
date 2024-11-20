import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import ProductHistorySchema from "../entities/ProductHistorySchema.js";
import ProductHistory from "../models/productHistory.js";
import BaseController from "./baseController.js";

export default class ProductHistoryController extends BaseController {
	static async all(req, res) {
		try {
			const productHistoryRepository =
				ProductHistoryController.getRepository(ProductHistorySchema);

			const options = ProductHistoryController.getQueryOptions(req.query);
			const filters = ProductHistoryController.getQueryFilters(req.query);

			const history = await productHistoryRepository.find({
				where: filters,
				...options,
			});

			return res.status(200).json({ data: history });
		} catch (error) {
			ProductHistoryController.handleError(
				res,
				"Error fetching history",
				error,
				500
			);
		}
	}

	static async create(req, res) {
		try {
			const productHistoryRepository =
				ProductHistoryController.getRepository(ProductHistorySchema);

			const history = ProductHistoryController.getBodyToCreate(req.body);

			const newHistory = new ProductHistory();
			newHistory.action = history.action;
			newHistory.product_id = history.product_id;
			newHistory.plu = history.plu;

			await productHistoryRepository.save(newHistory);

			return res.status(201).json({ data: newHistory });
		} catch (e) {
			ProductHistoryController.handleError(
				res,
				"Error on create history",
				error,
				500
			);
		}
	}

	static getQueryFilters(query) {
		const filters = {};

		if (query.plu) {
			filters.plu = query.plu;
		}

		if (query.action) {
			filters.action = query.action;
		}

		if (query.product_id && isNaN(parseInt(query.product_id))) {
			filters.product_id = parseInt(query.product_id);
		}

		if (query.date_from && query.date_to) {
			filters.date = Between(date_from, date_to);
		} else if (query.date_from) {
			filters.date = MoreThanOrEqual(date_from);
		} else if (query.date_to) {
			filters.date = LessThanOrEqual(date_to);
		}

		return filters;
	}

	static getBodyToCreate(body) {
		const { product_id, plu, action } = body;

		const history = {
			product_id: parseInt(product_id),
			plu,
			action,
		};

		if (isNaN(history.product_id) || !plu || !action) {
			throw new Error(`Invalid request body`);
		}

		return history;
	}
}
