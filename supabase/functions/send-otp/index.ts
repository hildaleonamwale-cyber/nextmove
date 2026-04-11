import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend@3.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SendOtpRequest {
  email: string;
  userId: string;
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const emailTemplate = (otp: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background-color: #f9fafb; }
    .container { max-width: 500px; margin: 0 auto; padding: 24px; background-color: #ffffff; border-radius: 12px; }
    .header { text-align: center; margin-bottom: 32px; }
    .logo { font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
    .logo-brand { color: #1FE6D4; }
    .title { font-size: 24px; font-weight: 600; color: #1a1c1e; margin: 16px 0 8px 0; font-family: 'Poppins', sans-serif; }
    .subtitle { font-size: 14px; color: #6b7280; line-height: 1.6; margin: 0 0 24px 0; }
    .otp-box { background-color: #f3f4f6; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0; }
    .otp-text { font-size: 12px; color: #6b7280; margin-bottom: 12px; font-weight: 500; }
    .otp-code { font-size: 42px; font-weight: 700; color: #1a1c1e; letter-spacing: 8px; font-family: 'Monaco', 'Menlo', monospace; }
    .expiry { font-size: 13px; color: #ef4444; margin-top: 12px; font-weight: 500; }
    .message { font-size: 14px; color: #4b5563; line-height: 1.6; margin: 24px 0; }
    .warning { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 6px; font-size: 13px; color: #92400e; margin: 16px 0; }
    .footer { text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; }
    .footer-text { font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">next<span class="logo-brand">move</span></div>
    </div>

    <h1 class="title">Verify Your Email</h1>
    <p class="subtitle">Enter this code to complete your account setup. The code expires in 10 minutes.</p>

    <div class="otp-box">
      <div class="otp-text">YOUR VERIFICATION CODE</div>
      <div class="otp-code">${otp}</div>
      <div class="expiry">⏱️ Expires in 10 minutes</div>
    </div>

    <p class="message">For security reasons, never share this code with anyone. Our team will never ask you for this code.</p>

    <div class="warning">
      <strong>⚠️ Security Notice:</strong> If you didn't request this code, someone may be trying to access your account. Please secure your password immediately.
    </div>

    <div class="footer">
      <p class="footer-text">© 2025 Nextmove. All rights reserved. | noreply@nextmove.co.zw</p>
    </div>
  </div>
</body>
</html>
`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { email, userId }: SendOtpRequest = await req.json();

    if (!email || !userId) {
      return new Response(
        JSON.stringify({ error: "Email and userId are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const otp = generateOtp();

    const response = await resend.emails.send({
      from: "Nextmove <noreply@nextmove.co.zw>",
      to: email,
      subject: "Your Nextmove Verification Code",
      html: emailTemplate(otp),
    });

    if (response.error) {
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: response.error }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, otp }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
