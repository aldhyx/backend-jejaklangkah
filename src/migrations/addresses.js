const createAddressesTable = `
    CREATE TABLE IF NOT EXISTS addresses(
        _id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id INT(11) UNSIGNED,
        address_name VARCHAR(30) NOT NULL,
        address VARCHAR(100) NOT NULL,
        city VARCHAR(60) NOT NULL,
        province VARCHAR(60) NOT NULL,
        is_default_address BOOLEAN DEFAULT FALSE,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME ON UPDATE CURRENT_TIMESTAMP
    );
`;

const createAddressesRelation = `
    ALTER TABLE addresses
        DROP FOREIGN KEY IF EXISTS fk_users_on_addresses;
    ALTER TABLE addresses
        ADD CONSTRAINT fk_users_on_addresses
        FOREIGN KEY (user_id) REFERENCES users(_id)
        ON DELETE CASCADE;
`;

exports.Table = [createAddressesTable];
exports.Relation = [createAddressesRelation];
