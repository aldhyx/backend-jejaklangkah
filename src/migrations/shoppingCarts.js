const createShoppingCartsTable = `
    CREATE TABLE IF NOT EXISTS shopping_carts(
        _id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id INT(11) UNSIGNED,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME ON UPDATE CURRENT_TIMESTAMP
    );
`;

const createShoppingCartsRelation = `
    ALTER TABLE shopping_carts
        DROP FOREIGN KEY IF EXISTS fk_users_on_shopping_carts;
    ALTER TABLE shopping_carts
        ADD CONSTRAINT fk_users_on_shopping_carts
        FOREIGN KEY (user_id) REFERENCES users(_id)
        ON DELETE SET NULL;
`;

exports.Table = [createShoppingCartsTable];
exports.Relation = [createShoppingCartsRelation];
