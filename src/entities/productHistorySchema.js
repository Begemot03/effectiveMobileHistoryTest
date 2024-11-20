import { EntitySchema } from "typeorm";
import ProductHistory from "../models/productHistory";

export default new EntitySchema({
	name: "ProductHistory",
	tableName: "ProductHistory",
	target: ProductHistory,
	columns: {
		id: {
			type: "int",
			primary: true,
			generated: true,
		},
		product_id: {
			type: "int",
			primary: true,
		},
		plu: {
			type: "varchar",
			length: 12,
		},
		action: {
			type: "varchar", // "CREATE"
			nullable: false,
		},
		date: {
			type: "timestamp",
			default: () => "CURRENT_TIMESTAMP",
		},
	},
});
