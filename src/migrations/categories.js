const createCategoriesTable = `
    CREATE TABLE IF NOT EXISTS categories(
        _id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME ON UPDATE CURRENT_TIMESTAMP
    );
`;

exports.Table = [createCategoriesTable];
exports.Relation = [];
