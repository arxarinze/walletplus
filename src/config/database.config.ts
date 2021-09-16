export default {
    port: process.env.DB_PORT ?? 10000,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbHost: process.env.DB_HOST,
    dbDriver: process.env.DB_DIALECT,
    dbPassword: process.env.DB_PASSWORD
}