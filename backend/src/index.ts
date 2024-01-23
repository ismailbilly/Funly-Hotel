import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { dbConnect, dbDisconnect } from "./config/dbConnect";
import swaggerDocs from "./utils/swagger";
import { errorHandler } from "./middlewares/errorHandler";
import { Api404Error } from "./utils/error";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};
app.use(cors(corsOptions));
app.use(cookieParser())
swaggerDocs(app);
/**
 * @swagger
 * '/api/test':
 *   get:
 *     description: returns 'hello from express endpoint!'
 *     responses:
 *       200:
 *         description: Success
 */
app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "hello from express endpoint!" });
});
//Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("*", async (req, res, next) =>
  next(new Api404Error("It seems you got lost"))
);
app.use(errorHandler);

//graceful shutdown in development, use SIGTERM in prod
process.on("SIGINT", async () => {
  try {
    await dbDisconnect();
    console.log("Disconnected from database.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
//Server
app.listen(7000, async () => {
  console.log("====================================");
  console.log("Server is running on localhost:7000");
  console.log("====================================");

  await dbConnect();
});
