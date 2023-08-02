import { DataSource } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();


const dataSource = new DataSource({
  type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "online_store",
});



export default {
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/migrations/*.js"],
    cli: {
      migrationsDir : "src/migrations",
    },
    dataSource
  }


  // npx typeorm migration:create MIGRATION_NAME
  // npx typeorm migration:run -d ormconfig.js
  // npx TYPEORM migration:generate 