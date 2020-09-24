const users = require('./users');
const addresses = require('./addresses');
const stores = require('./stores');
const categories = require('./categories');
const products = require('./products');
const shoppingCarts = require('./shoppingCarts');
const cartItems = require('./cartItems');
const productReviews = require('./productReviews');

module.exports = {
  tables: [
    ...users.Table,
    ...addresses.Table,
    ...stores.Table,
    ...categories.Table,
    ...products.Table,
    ...shoppingCarts.Table,
    ...cartItems.Table,
    ...productReviews.Table,
  ],
  relations: [
    ...users.Relation,
    ...addresses.Relation,
    ...stores.Relation,
    ...categories.Relation,
    ...products.Relation,
    ...shoppingCarts.Relation,
    ...cartItems.Relation,
    ...productReviews.Relation,
  ],
};
