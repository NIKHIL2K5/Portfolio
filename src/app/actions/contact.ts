"use server";

import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";
import nodemailer from "nodemailer";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required" };
  }

  try {
    // 1. Save to MongoDB
    await dbConnect();
    await Message.create({ name, email, message });

    // 2. Send Email via SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Portfolio Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // 3. Send Auto-responder Email to the user
    const autoResponderOptions = {
      from: `"Nikhil" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: `Thank you for reaching out, ${name}!`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 40px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.1);">
          <div style="margin-bottom: 32px;">
            <div style="width: 48px; hieght: 48px; background: #fff; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 24px; text-align: center; line-height: 48px;">N</div>
          </div>
          
          <h1 style="font-size: 32px; font-weight: 900; letter-spacing: -0.04em; margin-bottom: 24px; color: #fff;">Message Received.</h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.6); margin-bottom: 32px;">
            Hello ${name},<br/><br/>
            Thank you for reaching out. I've successfully received your message and will review it shortly. 
          </p>
          
          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 24px; border-radius: 16px; margin-bottom: 32px;">
            <p style="font-size: 14px; font-weight: 700; color: #4ade80; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px 0;">Next Step</p>
            <p style="font-size: 18px; font-weight: 600; color: #fff; margin: 0;">I will contact you within 24 hours of time.</p>
          </div>
          
          <p style="font-size: 14px; color: rgba(255,255,255,0.4); border-top: 1px solid rgba(255,255,255,0.1); pt: 32px; margin-top: 32px;">
            Best Regards,<br/>
            <strong>Nikhil</strong><br/>
            Full Stack Developer // AI Engineer
          </p>
        </div>
      `,
    };

    await transporter.sendMail(autoResponderOptions);

    return { success: true };
  } catch (error: any) {
    console.error("Contact Form Error:", error);
    return { success: false, error: "Something went wrong. Please try again later." };
  }
}
