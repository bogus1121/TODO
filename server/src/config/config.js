module.exports = {
    port: process.env.PORT || 8081,
    db: {
        HOST: process.env.HOST || 'localhost',
        USER: process.env.DB_USER || 'root',
        PASSWORD: process.env.DB_PASS || 'Philips11',
        DB: process.env.DB_NAME || 'todos',
        dialect: process.env.DIALECT || 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
};
