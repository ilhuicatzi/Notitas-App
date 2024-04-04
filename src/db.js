import pg from 'pg';

export const pool = new pg.Pool({
    port: 5432,
    host: 'localhost',
    user: 'postgres',
    password: 'ilhuicatzi.root',
    database: 'perndb'
});

pool.on('connect', () => {
    console.log('connected to the db: perndb');
});