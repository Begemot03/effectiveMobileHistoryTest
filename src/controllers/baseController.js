import AppDataSource from "../data-source.js";

export default class BaseController {
	static handleError(res, message, error, statusCode = 500) {
		console.error(message, error);
		return res.status(statusCode).json({ message, error });
	}
    
	static getRepository(entitySchema) {
		return AppDataSource.getRepository(entitySchema);
	}

	static getQueryOptions(query) {
		const options = { skip: 0, take: 10 };

		if (query.limit) {
			const limit = parseInt(query.limit, 10);
			if (!isNaN(limit) && limit > 0) {
				options.take = limit;
			}
		}

		if (query.offset) {
			const offset = parseInt(query.offset, 10);
			if (!isNaN(offset) && offset > 0) {
				options.skip = offset;
			}
		}

		return options;
	}
}
