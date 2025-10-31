// src/templates/otp.html.ts
export const otpTemplate = ({
  title,
  message,
  otp,
  expiry = "5 minutes",
}: {
  title: string;
  message: string;
  otp: string;
  expiry?: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #f7f7fa; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #10b981, #34d399); padding: 40px 30px; text-align: center; color: white; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
    .content { padding: 40px 30px; text-align: center; color: #374151; }
    .otp-box { background: #f3f4f6; padding: 20px; border-radius: 12px; font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #1f2937; margin: 25px auto; max-width: 280px; }
    .footer { background: #f9fafb; padding: 25px; text-align: center; color: #9ca3af; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${title}</h1>
    </div>
    <div class="content">
      <p>${message}</p>
      <div class="otp-box">${otp}</div>
      <p style="color: #6b7280; font-size: 14px;">
        Expires in <strong>${expiry}</strong>
      </p>
      <p style="font-size: 13px; color: #9ca3af; margin-top: 30px;">
        Didn’t request this? You can safely ignore it.
      </p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${process.env.APP_NAME}</p>
    </div>
  </div>
</body>
</html>
`;
