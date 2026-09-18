import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const brand = String(body.brand || "").trim();

    // Validate name
    if (!name) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please enter your name.",
        },
        { status: 400 },
      );
    }

    // Validate email
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please enter a valid email.",
        },
        { status: 400 },
      );
    }

    // Validate phone
    const phoneDigits = phone.replace(/\D/g, "");

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please enter a valid phone number.",
        },
        { status: 400 },
      );
    }

    // Validate brand
    if (!brand) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please tell us the product brand.",
        },
        { status: 400 },
      );
    }

    // Length validation
    if (name.length > 100) {
      return NextResponse.json(
        {
          ok: false,
          error: "Name is too long.",
        },
        { status: 400 },
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        {
          ok: false,
          error: "Email address is too long.",
        },
        { status: 400 },
      );
    }

    if (brand.length > 150) {
      return NextResponse.json(
        {
          ok: false,
          error: "Product brand is too long.",
        },
        { status: 400 },
      );
    }

    if (phone.length > 30) {
      return NextResponse.json(
        {
          ok: false,
          error: "Phone number is too long.",
        },
        { status: 400 },
      );
    }

    // Check SMTP configuration
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      console.error("SMTP environment variables are missing.");

      return NextResponse.json(
        {
          ok: false,
          error: "Email service is not configured.",
        },
        { status: 500 },
      );
    }

    const smtpPort = Number(process.env.SMTP_PORT || 587);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const toAddress = process.env.ENQUIRY_TO_EMAIL || process.env.SMTP_USER;

    // Escape values before inserting into HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeBrand = escapeHtml(brand);

    // Send email
    await transporter.sendMail({
      from: `"The Leather Laundry Website" <${process.env.SMTP_USER}>`,

      to: toAddress,

      subject: `Luxury Leather and Furniture Care - ${brand}`,

      text: `
Luxury Leather and Furniture Care

Customer Name: ${name}
Customer Email: ${email}
Phone Number: ${phone}
Product Brand: ${brand}

This enquiry was submitted through The Leather Laundry website.
      `.trim(),

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 24px;
          background: #ffffff;
          color: #222222;
        ">

          <h2 style="
            margin: 0 0 24px;
            font-size: 24px;
          ">
            Luxury Leather and Furniture Care
          </h2>

          <table style="
            width: 100%;
            border-collapse: collapse;
            font-size: 15px;
          ">

            <tr>
              <td style="
                padding: 12px;
                font-weight: 600;
                border-bottom: 1px solid #eeeeee;
              ">
                Customer Name
              </td>

              <td style="
                padding: 12px;
                border-bottom: 1px solid #eeeeee;
              ">
                ${safeName}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 12px;
                font-weight: 600;
                border-bottom: 1px solid #eeeeee;
              ">
                Customer Email
              </td>

              <td style="
                padding: 12px;
                border-bottom: 1px solid #eeeeee;
              ">
                ${safeEmail}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 12px;
                font-weight: 600;
                border-bottom: 1px solid #eeeeee;
              ">
                Phone Number
              </td>

              <td style="
                padding: 12px;
                border-bottom: 1px solid #eeeeee;
              ">
                ${safePhone}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 12px;
                font-weight: 600;
                border-bottom: 1px solid #eeeeee;
              ">
                Product Brand
              </td>

              <td style="
                padding: 12px;
                border-bottom: 1px solid #eeeeee;
              ">
                ${safeBrand}
              </td>
            </tr>

          </table>

          <p style="
            margin-top: 24px;
            color: #777777;
            font-size: 13px;
          ">
            This enquiry was submitted through the website
            enquiry form on The Leather Laundry website.
          </p>

        </div>
      `,
    });

    console.log("Enquiry email sent successfully.");

    return NextResponse.json({
      ok: true,
      message: "Your enquiry has been submitted successfully.",
    });
  } catch (error) {
    console.error("Enquiry mailer error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to send your enquiry. Please try again.",
      },
      { status: 500 },
    );
  }
}
