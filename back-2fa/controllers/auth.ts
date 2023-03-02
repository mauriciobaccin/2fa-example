const twofactor = require("node-2fa");
import { Request, Response, NextFunction } from "express";

import fakeUser from "./mocks/user";

const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = email === fakeUser.email && password === fakeUser.password  ? fakeUser : null;

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No user with that email exists",
      });
    }

    res.status(200).json({
      status: "success",
      user: fakeUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const ValidateOTP = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const validToken = twofactor.verifyToken(fakeUser.secret, token);

    if (!validToken) {
      return res.status(401).json({
        status: "dodge",
      });
    }

    res.status(200).json({
      otp_valid: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const GetQRCode = async (req: Request, res: Response) => {
  res.redirect(fakeUser.qr)
};


export default {
  LoginUser,
  ValidateOTP,
  GetQRCode,
};