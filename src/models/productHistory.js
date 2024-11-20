export default class ProductHistory {
    constructor(id, product_id, plu, action, date) {
        this.id = id;
        this.product_id = product_id;
        this.plu = plu;
        this.action = action;
        this.date = date;
    }
}