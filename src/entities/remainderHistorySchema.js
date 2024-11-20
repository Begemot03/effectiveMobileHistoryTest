import { EntitySchema } from "typeorm";
import RemainderHistory from "../models/remainderHistory";

export default new EntitySchema({
	name: "RemainderHistory",
	tableName: "RemainderHistory",
	target: RemainderHistory,
	columns: {
		id: {
			type: "int",
			primary: true,
			generated: true,
		},
		shop_id: {
			type: "int",
			nullable: false,
		},
		product_id: {
			type: "int",
			primary: true,
		},
		plu: {
			type: "varchar",
			nullable: false,
		},
		action: {
			type: "varchar", // "CREATE", "DECREASE", "INCREASE"
			nullable: false,
		},
		date: {
			type: "timestamp",
			default: () => "CURRENT_TIMESTAMP",
		},
	},
});
