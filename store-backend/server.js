require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const authRoutes = require("./routes/authRoutes");

const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const createDefaultAdmin = require("./config/createAdmin");


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StoreHub API Running",
  });
});

createDefaultAdmin();
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});