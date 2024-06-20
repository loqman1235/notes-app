import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: Number(process.env.PORT) || 3000,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
};

export default config;
