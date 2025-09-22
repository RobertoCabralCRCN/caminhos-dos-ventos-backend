require("dotenv").config();
const { DataSource } = require("typeorm");

const config = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME || "caminho_dos_ventos_user",
  password: process.env.DB_PASSWORD || "caminho_dos_ventos_password",
  database: process.env.DB_NAME || "caminho_dos_ventos_db",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: false,
  migrations: ["dist/src/migrations/**/*{.ts,.js}"],
  migrationsRun: false,
};

module.exports = new DataSource(config);
