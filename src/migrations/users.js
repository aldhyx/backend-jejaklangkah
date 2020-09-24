const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users(
        _id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        role ENUM('1','2','3') NOT NULL DEFAULT 3 COMMENT'1=super admin; 2=seller; 3=user',
        firstname VARCHAR(60) NOT NULL,
        lastname VARCHAR(60) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL UNIQUE,
        gender ENUM('male', 'female', 'others'),
        birthday DATE DEFAULT NULL,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
        email_verified BOOLEAN DEFAULT FALSE,
        email_verified_at DATETIME DEFAULT NULL
    );
`;

const createUsersRelation = `
    ALTER TABLE users
        DROP FOREIGN KEY IF EXISTS fk_roles_on_users;
    ALTER TABLE users
        ADD CONSTRAINT fk_roles_on_users
        FOREIGN KEY (role_id) REFERENCES roles(_id)
        ON DELETE RESTRICT;
`;

exports.Table = [createUsersTable];
exports.Relation = [createUsersRelation];
