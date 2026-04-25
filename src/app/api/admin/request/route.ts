import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import { AccessRequest } from '@/models/Portfolio';
import { sendEmail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await connectDB();

    // Create a secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours to approve

    await AccessRequest.create({
      email,
      token,
      expiresAt,
    });

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = req.headers.get('host');
    const baseUrl = `${protocol}://${host}`;

    const approveUrl = `${baseUrl}/api/admin/verify?token=${token}&action=approve`;
    const rejectUrl = `${baseUrl}/api/admin/verify?token=${token}&action=reject`;

    // Send email to owner
    await sendEmail({
      to: process.env.RECEIVER_EMAIL!,
      subject: `🛡️ New Access Request: ${email}`,
      text: `New access request from ${email}. Approve: ${approveUrl} Reject: ${rejectUrl}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, sans-serif;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="padding: 60px 0;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 40px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 40px 100px rgba(15, 23, 42, 0.05);">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 50px; background-color: #fcfcfc; text-align: center; border-bottom: 1px solid #f1f5f9;">
                      <div style="display: inline-block; width: 8px; height: 8px; background-color: #000000; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></div>
                      <span style="color: #64748b; font-size: 11px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase; vertical-align: middle;">Security Protocol</span>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 60px 50px;">
                      <div style="text-align: center; margin-bottom: 50px;">
                        <h1 style="margin: 0; color: #000000; font-size: 36px; font-weight: 900; letter-spacing: -0.04em; text-transform: uppercase; font-style: italic; line-height: 1;">
                          <span style="color: #e2e8f0; font-style: normal; display: block; font-size: 28px;">Security</span> Access Request
                        </h1>
                      </div>

                      <div style="background-color: #f8fafc; border-radius: 24px; padding: 30px; border: 1px solid #e2e8f0; margin-bottom: 50px; text-align: center;">
                        <p style="margin: 0; color: #94a3b8; font-size: 10px; text-transform: uppercase; font-weight: 800; letter-spacing: 0.2em; margin-bottom: 10px;">Requesting Entity</p>
                        <p style="margin: 0; color: #0f172a; font-size: 18px; font-weight: 700; font-family: monospace;">${email}</p>
                      </div>

                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="padding-right: 10px;">
                            <a href="${approveUrl}" style="display: block; background-color: #000000; color: #ffffff; padding: 22px; text-decoration: none; border-radius: 20px; text-align: center; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em;">Approve Protocol</a>
                          </td>
                          <td style="padding-left: 10px;">
                            <a href="${rejectUrl}" style="display: block; background-color: #ffffff; color: #000000; padding: 22px; text-decoration: none; border-radius: 20px; text-align: center; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; border: 1px solid #e2e8f0;">Terminate</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 50px; background-color: #fcfcfc; border-top: 1px solid #f1f5f9; text-align: center;">
                      <p style="margin: 0; color: #cbd5e1; font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5em;">
                        Automated Security Node // Cluster V4
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ message: 'Request sent successfully' });
  } catch (error: any) {
    console.error('Request error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
