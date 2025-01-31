import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import destinationRoutes from "./route/destiationRoutes.js";
//import planRoutes from "./route/planRoutes.js";
import userRoutes from "./route/userRoute.js";
import paymentRoutes from "./route/paymantRoutes.js";
import vehicleRoutes from "./route/vehicleRoutes.js";
import packageRoutes from "./route/packageRoutes.js";
import advertisementRoutes from "./route/advertisementRoutes.js";
import reviewRoutes from "./route/reviewRoutes.js";
import adventureRoutes from "./route/adventureRoutes.js";
import financeRoutes from "./route/financeRoute.js";
import touristPlanRoutes from "./route/touristPlanRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/destination", destinationRoutes);

//app.use("/plane",planRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/advertisements", advertisementRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/adventures", adventureRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/tourist-plans", touristPlanRoutes);

//database conection
mongoose
  .connect("mongodb+srv://admin:WNM6le3U5gTaDz5d@users.xzqkmsk.mongodb.net/")
  .then(() => {
    console.log("Database connected");
    app.listen(8080, () => {});
  })
  .catch((err) => console.log(err));
