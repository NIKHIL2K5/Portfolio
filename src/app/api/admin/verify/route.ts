import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import { AccessRequest, AdminSession } from '@/models/Portfolio';
import { sendEmail } from '@/lib/mailer';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const action = searchParams.get('action');

  const renderStatusPage = (status: 'approved' | 'rejected' | 'error', message: string, icon: string) => {
    const themeColor = status === 'approved' ? '#10b981' : status === 'rejected' ? '#f43f5e' : '#f59e0b';
    const statusText = status === 'approved' ? 'Access Granted' : status === 'rejected' ? 'Access Terminated' : 'Action Failed';
    
    return new Response(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Protocol Status</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,700;1,900&display=swap');
          
          :root {
            --bg: #ffffff;
            --card: #ffffff;
            --accent: ${themeColor};
            --text: #0f172a;
            --text-dim: #64748b;
            --border: #f1f5f9;
          }

          body {
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
            color: var(--text);
            font-family: 'Inter', -apple-system, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            overflow: hidden;
          }

          .container {
            max-width: 500px;
            width: 85%;
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 40px;
            padding: 80px 50px;
            text-align: center;
            position: relative;
            box-shadow: 0 40px 100px rgba(15, 23, 42, 0.08);
            animation: emerge 1s cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes emerge {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }

          .header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 50px;
          }

          .logo-dot {
            width: 10px;
            height: 10px;
            background: var(--accent);
            border-radius: 50%;
          }

          .logo-text {
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: var(--text-dim);
          }

          h1 {
            font-size: 44px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: -0.05em;
            margin: 0;
            font-style: italic;
            line-height: 0.9;
            color: #000000;
          }

          h1 span {
            color: #e2e8f0;
            font-style: normal;
            display: block;
            font-size: 36px;
            margin-bottom: 4px;
          }

          .status-badge {
            display: inline-block;
            margin-top: 30px;
            padding: 10px 24px;
            background: ${themeColor}08;
            border: 1px solid ${themeColor}15;
            border-radius: 100px;
            color: var(--accent);
            font-size: 10px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.3em;
          }

          .divider {
            width: 30px;
            height: 2px;
            background: #f1f5f9;
            margin: 40px auto;
          }

          .message {
            font-size: 15px;
            color: var(--text-dim);
            line-height: 1.6;
            font-weight: 500;
            max-width: 320px;
            margin: 0 auto 60px;
          }

          .action-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 68px;
            background: #000000;
            color: #ffffff;
            text-decoration: none;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
            background: #1a1a1a;
          }

          .footer {
            margin-top: 40px;
            font-size: 9px;
            color: #e2e8f0;
            text-transform: uppercase;
            letter-spacing: 0.5em;
            font-weight: 900;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo-dot"></div>
            <div class="logo-text">Security Node</div>
          </div>

          <h1><span>Protocol</span>Result</h1>
          
          <div class="status-badge">${statusText}</div>

          <div class="divider"></div>

          <div class="message">${message}</div>

          <a href="/" class="action-btn">Back to Portfolio</a>

          <div class="footer">Verification System // Cluster V4</div>
        </div>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  };

  try {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = req.headers.get('host');
    const baseUrl = `${protocol}://${host}`;

    if (!token || !action) {
      return renderStatusPage('error', 'Invalid or missing security parameters.', '⚠️');
    }

    await connectDB();

    const request = await AccessRequest.findOne({ token, status: 'pending' });

    if (!request) {
      return renderStatusPage('error', 'The requested protocol has already been processed or is invalid.', '⏳');
    }

    if (action === 'reject') {
      request.status = 'rejected';
      await request.save();

      await sendEmail({
        to: request.email,
        subject: 'Access Request Update | Portfolio Admin',
        text: 'Your request for access has been rejected.',
        html: `
          <!DOCTYPE html>
          <html>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, sans-serif;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="padding: 60px 0;">
                  <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 40px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 40px 100px rgba(15, 23, 42, 0.05);">
                    <tr>
                      <td style="padding: 40px 50px; background-color: #fcfcfc; text-align: center; border-bottom: 1px solid #f1f5f9;">
                        <div style="display: inline-block; width: 8px; height: 8px; background-color: #f43f5e; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></div>
                        <span style="color: #64748b; font-size: 11px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase; vertical-align: middle;">Security Update</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 60px 50px; text-align: center;">
                        <h1 style="margin: 0; color: #000000; font-size: 36px; font-weight: 900; letter-spacing: -0.04em; text-transform: uppercase; font-style: italic; line-height: 1; margin-bottom: 24px;">
                          <span style="color: #e2e8f0; font-style: normal; display: block; font-size: 28px;">Request</span> Declined
                        </h1>
                        <p style="margin: 0; color: #64748b; font-size: 16px; line-height: 1.6; font-weight: 500;">
                          Your request for access to the portfolio admin panel has been reviewed and <strong>declined</strong> at this time.
                        </p>
                        <a href="${baseUrl}/admin/reject" style="display: block; background-color: #f43f5e; color: #ffffff; padding: 24px; text-decoration: none; border-radius: 20px; text-align: center; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em;">View Status</a>
                        <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #f1f5f9;">
                          <p style="margin: 0; color: #94a3b8; font-size: 11px; font-weight: 500;">If you believe this is an error, please reach out directly.</p>
                        </div>
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

      return renderStatusPage('rejected', `Rejection meesages has been send to ${request.email}`, '🚫');
    }

    if (action === 'approve') {
      request.status = 'approved';
      await request.save();

      const accessToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

      await AdminSession.create({
        token: accessToken,
        expiresAt,
      });

      const approveUrl = `${baseUrl}/admin/approve?token=${accessToken}`;

      await sendEmail({
        to: request.email,
        subject: '🎉 Access Granted | Portfolio Admin',
        text: `Congratulations! You have been granted access. Link: ${approveUrl}`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, sans-serif;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="padding: 60px 0;">
                  <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 40px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 40px 100px rgba(15, 23, 42, 0.05);">
                    <tr>
                      <td style="padding: 40px 50px; background-color: #fcfcfc; text-align: center; border-bottom: 1px solid #f1f5f9;">
                        <div style="display: inline-block; width: 8px; height: 8px; background-color: #10b981; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></div>
                        <span style="color: #64748b; font-size: 11px; font-weight: 800; letter-spacing: 0.3em; text-transform: uppercase; vertical-align: middle;">Security Access</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 60px 50px; text-align: center;">
                        <h1 style="margin: 0; color: #000000; font-size: 36px; font-weight: 900; letter-spacing: -0.04em; text-transform: uppercase; font-style: italic; line-height: 1; margin-bottom: 24px;">
                          <span style="color: #e2e8f0; font-style: normal; display: block; font-size: 28px;">Access</span> Granted
                        </h1>
                        <p style="margin: 0; color: #64748b; font-size: 16px; line-height: 1.6; font-weight: 500; margin-bottom: 40px;">
                          Your access request has been approved. You can now enter the administrative cluster.
                        </p>
                        
                        <a href="${approveUrl}" style="display: block; background-color: #000000; color: #ffffff; padding: 24px; text-decoration: none; border-radius: 20px; text-align: center; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em;">Enter Cluster</a>

                        <div style="margin-top: 40px; padding: 20px; background-color: #fffbeb; border-radius: 16px; border: 1px solid #fef3c7;">
                          <p style="margin: 0; color: #92400e; font-size: 11px; font-weight: 700; letter-spacing: 0.05em;">
                            ⚠️ TEMPORARY ACCESS: Link expires in 30 minutes.
                          </p>
                        </div>
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

      return renderStatusPage('approved', `Admin access has been send to ${request.email}`, '✅');
    }

    return renderStatusPage('error', 'Invalid security action.', '❌');
  } catch (error) {
    console.error('Verify error:', error);
    return renderStatusPage('error', 'A critical protocol error has occurred.', '🔥');
  }
}
