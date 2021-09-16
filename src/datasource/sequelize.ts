import { Dialect, Sequelize } from 'sequelize'
import databaseEnv from "../config/database.config";

const dbName = databaseEnv.dbName as string
const dbUser = databaseEnv.dbUser as string
const dbHost = databaseEnv.dbHost
const dbDriver = databaseEnv.dbDriver as Dialect
const dbPassword = databaseEnv.dbPassword

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver
})

export default sequelizeConnection