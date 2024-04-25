import { Database } from '../types' // this is the Database interface we defined earlier
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import dotenv from 'dotenv';

dotenv.config();
const config = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  port: 5432,
  max: 10,
}

const dialect = new PostgresDialect({
  pool: new Pool(config)
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
})
