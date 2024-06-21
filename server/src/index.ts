import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import config from "./config";
import routes from "./routes";
import { errorHandler } from "./middlewares";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: config.CLIENT_URL }));
app.use(express.static("public"));

// Test error handler
app.post("/test-error", (req, res) => {
  throw new Error("Test error");
});

// Routes
app.use("/api", routes);

// Error handler
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});
