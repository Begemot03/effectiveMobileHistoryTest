import RemainderHistorySchema from "../entities/RemainderHistorySchema.js";
import RemainderHistory from "../models/remainderHistory.js";
import BaseController from "./baseController.js";

export default class RemainderHistoryController extends BaseController {
	static async all() {
		try {
			const remainderHistoryRepository =
				RemainderHistoryController.getRepository(RemainderHistorySchema);

			const options = RemainderHistoryController.getQueryOptions(req.query);
			const filters = RemainderHistoryController.getQueryFilters(req.query);

			const history = await remainderHistoryRepository.find({
				where: filters,
				...options,
			});

			return res.status(200).json({ data: history });
		} catch (error) {
			RemainderHistoryController.handleError(
				res,
				"Error fetching history",
				error,
				500
			);
		}
	}

	static async create() {
		try {
			const remainderHistoryRepository =
				RemainderHistoryController.getRepository(ProductHistorySchema);

			const history = RemainderHistoryController.getBodyToCreate(req.body);

			const newHistory = new RemainderHistory();
			newHistory.action = history.action;
			newHistory.shop_id = history.shop_id;
			newHistory.product_id = history.product_id;
			newHistory.plu = history.plu;

			await remainderHistoryRepository.save(newHistory);

			return res.status(201).json({ data: newHistory });
		} catch (e) {
			RemainderHistoryController.handleError(
				res,
				"Error on create history",
				error,
				500
			);
		}
	}

	static getBodyToCreate(body) {
		const { shop_id, product_id, plu, action } = body;

		const history = {
			shop_id: parseInt(shop_id),
			product_id: parseInt(product_id),
			plu,
			action,
		};

		if (
			isNaN(history.shop_id) ||
			isNaN(history.product_id) ||
			!plu ||
			!action
		) {
			throw new Error(`Invalid request body`);
		}

		return history;
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

        if (query.shop_id && isNaN(parseInt(query.shop_id))) {
			filters.shop_id = parseInt(query.shop_id);
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
}
