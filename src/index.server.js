const express = require("express");

const app = express();
const db = require("./config/db/index");

const path = require("path");
const cors = require("cors");

//todo routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");

//todo mongodb connect
db.connect();

//handle MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/api", authRoutes);
app.use("/api", adminRoutes);

app.use("/api", categoryRoutes);

app.use("/api", productRoutes);

app.use("/api", cartRoutes);

app.use("/api", initialDataRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
