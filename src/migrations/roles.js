const createRolesTable = `
    CREATE TABLE IF NOT EXISTS roles(
        _id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        role CHAR(1) NOT NULL COMMENT'1=super admin; 2=seller; 3=user',
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME ON UPDATE CURRENT_TIMESTAMP
    );
`;

exports.Table = [createRolesTable];
exports.Relation = [];
