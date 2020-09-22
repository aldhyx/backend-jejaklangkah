const createProductReviewsTable = `
    CREATE TABLE IF NOT EXISTS product_reviews(
        _id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        product_id INT(11) UNSIGNED,
        user_id INT(11) UNSIGNED,
        rating ENUM('1','2','3','4','5') NOT NULL,
        review VARCHAR(100) NOT NULL,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME ON UPDATE CURRENT_TIMESTAMP
    );
`;

const createProductReviewsRelation = `
    ALTER TABLE product_reviews
        DROP FOREIGN KEY IF EXISTS fk_products_on_product_reviews;
    ALTER TABLE product_reviews
        ADD CONSTRAINT fk_products_on_product_reviews
        FOREIGN KEY (product_id) REFERENCES products(_id)
        ON DELETE SET NULL;


    ALTER TABLE product_reviews
        DROP FOREIGN KEY IF EXISTS fk_users_on_product_reviews;
    ALTER TABLE product_reviews
        ADD CONSTRAINT fk_users_on_product_reviews
        FOREIGN KEY (user_id) REFERENCES users(_id)
        ON DELETE SET NULL;
`;

exports.Table = [createProductReviewsTable];
exports.Relation = [createProductReviewsRelation];
