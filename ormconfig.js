module.exports = {

  "type": process.env.DATABASE_TYPE,

  "port": process.env.DATABASE_PORT,

  "host": process.env.DATABASE_HOST,

  "username": process.env.DATABASE_NAME,

  "password": process.env.DATABASE_PASSWORD,

  "database": process.env.DATABASE,

  "entities": ["./src/modules/**/entities/*.ts"],

  "migrations": ["./src/database/migrations/*.ts"],

  "cli": {

      "migrationsDir": "./src/database/migrations"

  }

}
