import { Response } from "express";
import { HTTP_STATUS } from "../constants";

const sendResponse = (
  res: Response,
  status: (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS],
  message: string,
  data: any = null
) => {
  if (data) return res.status(status).json({ message, data });

  return res.status(status).json({ message });
};

export default sendResponse;
