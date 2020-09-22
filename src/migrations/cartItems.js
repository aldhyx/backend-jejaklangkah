const createCartItemsTable = `
    CREATE TABLE IF NOT EXISTS cart_items(
        _id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        product_id INT(11) UNSIGNED,
        shopping_cart_id INT(11) UNSIGNED,
        quantity VARCHAR(3) NOT NULL,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME ON UPDATE CURRENT_TIMESTAMP
    );
`;

const createCartItemsRelation = `
    ALTER TABLE cart_items
        DROP FOREIGN KEY IF EXISTS fk_products_on_cart_items;
    ALTER TABLE cart_items
        ADD CONSTRAINT fk_products_on_cart_items
        FOREIGN KEY (product_id) REFERENCES products(_id)
        ON DELETE CASCADE;


    ALTER TABLE cart_items
        DROP FOREIGN KEY IF EXISTS fk_shopping_carts_on_cart_items;
    ALTER TABLE cart_items
        ADD CONSTRAINT fk_shopping_carts_on_cart_items
        FOREIGN KEY (shopping_cart_id) REFERENCES shopping_carts(_id)
        ON DELETE CASCADE;
`;

exports.Table = [createCartItemsTable];
exports.Relation = [createCartItemsRelation];
