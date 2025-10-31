// src/auth.ts
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { emailOTP, phoneNumber, username } from "better-auth/plugins";
import { sendEmail } from "./email";
import { welcomeTemplate } from "../templates/welcome.html";
import { otpTemplate } from "../templates/otp.html";
import { resetPasswordTemplate } from "../templates/reset-password.html";

export const auth = betterAuth({
  baseUrl: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  basePath: "/api/auth",
  trustedOrigins: ["http://localhost:3000", "http://localhost:5173"],

  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    sendResetPassword: async ({ user, url }) => {
      const html = resetPasswordTemplate(url);
      await sendEmail({
        to: user.email,
        subject: "Reset Your Password",
        html,
      });
    },
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        let title = "";
        let message = "";

        switch (type) {
          case "sign-in":
            title = "Your Sign-In Code";
            message = "Enter this code to sign in:";
            break;
          case "email-verification":
            title = "Verify Your Email";
            message = "Use this code to verify your email:";
            break;
          case "forget-password":
            title = "Password Reset Code";
            message = "Use this code to reset your password:";
            break;
        }

        const html = otpTemplate({ title, message, otp });
        await sendEmail({ to: email, subject: title, html });
      },
      storeOTP: "hashed",
      sendVerificationOnSignUp: true,
    }),
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }) => {
        console.log(`SMS OTP: ${code} → ${phoneNumber}`);
        // Add Twilio later
      },
    }),
    username(),
  ],

  secret: process.env.BETTER_AUTH_SECRET!,

  // Send Welcome Email
  callbacks: {
    async signUp({ user }) {
      const name = user.name || user.email.split("@")[0];
      const html = welcomeTemplate(name, process.env.APP_NAME || "YourApp");

      await sendEmail({
        to: user.email,
        subject: `Welcome to ${process.env.APP_NAME || "YourApp"}, ${name}!`,
        html,
      });
    },
  },
});
