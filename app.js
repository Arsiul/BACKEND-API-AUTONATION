import express from "express"
import cors from "cors";
import routerClient from "./src/routes/client.route.js";


const app = express()
app.use(cors());
app.use(express.json())

app.use("/api/client", routerClient)


export default app;