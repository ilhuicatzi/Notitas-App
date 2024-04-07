import pg from "pg";
import "dotenv/config";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
export const pool = new pg.Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});

pool.on("connect", () => {
  console.log("connected to the db: perndb");
});
