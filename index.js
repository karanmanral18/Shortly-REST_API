const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

app.use(helmet());
app.use(compression());
// Connect to database
connectDB();
app.use(cors());
app.use(express.json());

// Define Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
