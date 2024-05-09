import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { UserRoutes } from "./routes/User.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/swagger', (req, res) => {
    res.sendFile(process.cwd() + '/src/swagger.json');
})
app.get('/docs', (req, res) => {
    res.sendFile(process.cwd() + '/index.html');
})
app.use(UserRoutes)

app.listen(3001, () => {
    console.log("inicou o servidor!")
})