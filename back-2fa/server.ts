import express from "express";
import cors from "cors";

import authController from './controllers/auth';

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

app.get('/qrcode', authController.GetQRCode)
app.post("/login", authController.LoginUser);
app.post("/otp/validate", authController.ValidateOTP);

const PORT = 8000;
app.listen(PORT, () => {
  console.info(`Server started on port: ${PORT}`);
});
