// src/templates/welcome.html.ts
export const welcomeTemplate = (name: string, appName: string = "YourApp") => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Welcome to ${appName}!</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center; color: white; }
    .header h1 { margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; }
    .header p { margin: 12px 0 0; font-size: 16px; opacity: 0.9; }
    .content { padding: 40px 35px; color: #444; line-height: 1.7; }
    .content h2 { color: #333; margin-top: 0; }
    .btn { display: inline-block; background: #667eea; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 20px 0; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); }
    .btn:hover { background: #5a6fd8; }
    .footer { background: #f8f9fc; padding: 30px; text-align: center; color: #888; font-size: 14px; border-top: 1px solid #eee; }
    .highlight { color: #667eea; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome, ${name}!</h1>
      <p>You’re now part of the ${appName} family</p>
    </div>
    <div class="content">
      <h2>Let’s get you started</h2>
      <p>Hi <span class="highlight">${name}</span>,</p>
      <p>Thanks for joining <strong>${appName}</strong>! We're excited to have you on board.</p>
      <p>Explore your dashboard, set up your profile, and start using all the powerful features we’ve built for you.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${
          process.env.BETTER_AUTH_URL
        }/dashboard" class="btn">Go to Dashboard</a>
      </div>
      <p>Need help? Just reply to this email — we’re here 24/7.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
      <p><a href="${
        process.env.BETTER_AUTH_URL
      }" style="color: #888; text-decoration: underline;">${
  process.env.BETTER_AUTH_URL
}</a></p>
    </div>
  </div>
</body>
</html>
`;
