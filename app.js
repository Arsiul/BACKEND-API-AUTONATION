import express from "express"
import cors from "cors";
import clientroute from "./src/routes/client.route.js";
import authrouter from "./src/routes/auth.route.js";
import userrouter from "./src/routes/user.route.js";
import saleRouter from "./src/routes/sale.route.js";
import vehicleroute from "./src/routes/vehicle.route.js";
import buyRouter from "./src/routes/buy.route.js";

const app = express()
app.use(cors());
app.use(express.json())

app.use("/api/client", clientroute)
app.use("/api/user", userrouter)
app.use("/api/user", authrouter)
app.use("/api/sale", saleRouter)
app.use("/api/vehicles", vehicleroute)
app.use("/api/buy", buyRouter)

export default app;