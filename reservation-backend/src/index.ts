import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { UserRoutes } from "./routes/User.routes";


dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(UserRoutes)

app.listen(3001, () => {
    console.log("inicou o servidor!")
})