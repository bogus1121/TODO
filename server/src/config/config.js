// module.exports = {
//   port: process.env.PORT || 8081,
//   db: {
//     database: process.env.DB_NAME || "todos",
//     user: process.env.DB_USER || "todos",
//     password: process.env.DB_PASS || "todos",
//     options: {
//       dialect: process.env.DIALECT || "mysql",
//       host: process.env.HOST || "localhost",
//       storage: "./todos.sqlite",
//     },
//   },
//   authentication: {
//     jwtSecret: process.env.JWT_SECRET || "secret",
//   },
// };

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    HOST: process.env.HOST || "localhost",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASS || "Philips11",
    DB: process.env.DB_NAME || "todos",
    dialect: process.env.DIALECT || "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "secret",
  },
};
