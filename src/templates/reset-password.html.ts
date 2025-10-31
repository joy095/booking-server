// src/templates/reset-password.html.ts
export const resetPasswordTemplate = (url: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Reset Your Password</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #fdfdfd; margin: 0; padding: 0; }
    .container { max-width: 580px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #f97316, #fb923c); padding: 45px 30px; text-align: center; color: white; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
    .content { padding: 40px 35px; text-align: center; color: #444; }
    .btn { display: inline-block; background: #f97316; color: white; padding: 16px 36px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 20px 0; box-shadow: 0 5px 15px rgba(249, 115, 22, 0.4); }
    .footer { background: #fef3c7; padding: 25px; text-align: center; color: #92400e; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset</h1>
    </div>
    <div class="content">
      <p>We received a request to reset your password.</p>
      <p>Click below to choose a new one:</p>
      <a href="${url}" class="btn">Reset Password</a>
      <p style="color: #6b7280; font-size: 14px; margin-top: 25px;">
        Link expires in <strong>15 minutes</strong>
      </p>
      <p style="font-size: 13px; color: #9ca3af; margin-top: 30px;">
        If you didn’t request this, no action is needed.
      </p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${process.env.APP_NAME}</p>
    </div>
  </div>
</body>
</html>
`;
