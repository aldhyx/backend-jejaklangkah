const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products(
        _id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        store_id INT(11) UNSIGNED,
        category_id INT(11) UNSIGNED,
        name VARCHAR(60) NOT NULL,
        price VARCHAR(10) NOT NULL,
        stock VARCHAR(4) NOT NULL,
        description VARCHAR(60) NOT NULL,
        image VARCHAR(100),
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME ON UPDATE CURRENT_TIMESTAMP
    );
`;

const createProductsRelation = `
    ALTER TABLE products
        DROP FOREIGN KEY IF EXISTS fk_stores_on_products;
    ALTER TABLE products
        ADD CONSTRAINT fk_stores_on_products
        FOREIGN KEY (store_id) REFERENCES stores(_id)
        ON DELETE SET NULL;


    ALTER TABLE products
        DROP FOREIGN KEY IF EXISTS fk_categories_on_products;
    ALTER TABLE products
        ADD CONSTRAINT fk_categories_on_products
        FOREIGN KEY (category_id) REFERENCES categories(_id)
        ON DELETE SET NULL;
`;

exports.Table = [createProductsTable];
exports.Relation = [createProductsRelation];
