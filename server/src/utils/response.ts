// utils/response.ts
import { Response } from "express";

const sendResponse = (
  res: Response,
  status: number,
  message: string,
  data: any = null
) => {
  if (data) return res.status(status).json({ message, data });

  return res.status(status).json({ message });
};

export default sendResponse;
