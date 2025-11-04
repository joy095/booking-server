// src/auth.ts
import { betterAuth } from "better-auth";
import { emailOTP, phoneNumber, username } from "better-auth/plugins";
import { sendEmail } from "./email";
import { welcomeTemplate } from "../templates/welcome.html";
import { otpTemplate } from "../templates/otp.html";
import { resetPasswordTemplate } from "../templates/reset-password.html";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { account, session, user, verification } from "../db/schema/auth-schema";

export const auth = betterAuth({
  baseUrl: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  basePath: "/api/auth",
  trustedOrigins: ["http://localhost:3000", process.env.CLIENT_URL as string],

  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),

  rateLimit: {
    window: 60, // time window in seconds
    max: 30, // max requests in the window
    customRules: {
      "/sign-in/email": {
        window: 10,
        max: 3,
      },
      "/email-otp/verify-email/*": async (request) => {
        // custom function to return rate limit window and max
        return {
          window: 10,
          max: 5,
        };
      },
      "/request-password-reset/*": async (request) => {
        // custom function to return rate limit window and max
        return {
          window: 30,
          max: 3,
        };
      },
    },
  },

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
