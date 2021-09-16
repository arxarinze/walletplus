import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response, NextFunction } from "express"
import env from "./config/server.config";
import authRoute from "./routes/auth.route";
import transactionRoute from "./routes/transaction.route";
var db = require('./models');
const app: Application = express()
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("I'm Up And Running")
})
app.use('/auth', authRoute);
app.use('/transaction', transactionRoute);
const PORT = env.port;

app.listen(PORT, () => {
  console.log(`WalletPlus is running on PORT ${PORT}`);
  db.sequelize.sync();
})

export default app;