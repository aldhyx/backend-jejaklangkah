const createStoresTable = `
    CREATE TABLE IF NOT EXISTS stores(
        _id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id INT(11) UNSIGNED,
        address VARCHAR(100) NOT NULL,
        city VARCHAR(60) NOT NULL,
        province VARCHAR(60) NOT NULL,
        logo VARCHAR(100),
        description VARCHAR(100) NOT NULL,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME ON UPDATE CURRENT_TIMESTAMP
    );
`;

const createStoresRelation = `
    ALTER TABLE stores
        DROP FOREIGN KEY IF EXISTS fk_users_on_stores;
    ALTER TABLE stores
        ADD CONSTRAINT fk_users_on_stores
        FOREIGN KEY (user_id) REFERENCES users(_id)
        ON DELETE SET NULL;
`;

exports.Table = [createStoresTable];
exports.Relation = [createStoresRelation];
