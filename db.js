import pkg from 'pg';
const { Pool } = pkg;
import { config } from 'dotenv';

config();

// export const pool = new Pool({
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   host: process.env.PGHOST,
//   port: process.env.PGPORT,
//   database: process.env.PGDATABASE,
// });

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL; //heroku addons

export const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'production' ? proConfig : devConfig,
});
