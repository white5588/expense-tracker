import { google } from "googleapis";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const googleID: string =
  "172413036255-qdhvp5rcl2ig1ibnb9jbmp49p6rksbjg.apps.googleusercontent.com";

const googleSecret: string = "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";

const googleRefresh: string =
  "1//04el9GAhUqUbHCgYIARAAGAQSNwF-L9IrEOkvPFGW2KqlCfUFFFeKZhIUlcal7ilNfpMlAFWgHXUDHQm_qIHZxTXZbBiAs63HBhE";

const googleUrl: string = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(googleID, googleSecret, googleUrl);
oAuth.setCredentials({ access_token: googleRefresh });

export const sendMail = async (user: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "kossyuzoigwe@gmail.com",
        clientId: googleID,
        clientSecret: googleSecret,
        refreshToken: googleRefresh,
        accessToken,
      },
    });
    const token = jwt.sign({ id: user?._id }, "token");

    const mailer = {
      from: "OTP request validation <kossyuzoigwe@gmail.com>",
      to: user?.email,
      subject: `Your otp is ${user?.otp}`,
      html: `<p>${user?.userName}</p><a href="http://localhost:3700/api/${token}/verify">OTP</a>`,
    };

    transporter.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};
