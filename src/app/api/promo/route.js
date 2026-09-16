import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();

    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const brand = String(body.brand || "").trim();

    // Validation
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please enter a valid email.",
        },
        { status: 400 }
      );
    }

    if (phone.replace(/\D/g, "").length < 7) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please enter a valid phone number.",
        },
        { status: 400 }
      );
    }

    if (!brand) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please tell us the product brand.",
        },
        { status: 400 }
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
        { status: 500 }
      );
    }

    const smtpPort = Number(process.env.SMTP_PORT || 587);

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Optional SMTP verification
    await transporter.verify();

    const toAddress =
      process.env.PROMO_TO_EMAIL || process.env.SMTP_USER;

    // Send email
    await transporter.sendMail({
      from: `"The Leather Laundry Website" <${process.env.SMTP_USER}>`,
      to: toAddress,
      replyTo: email,

      subject: `New Free Quote Request - ${brand}`,

      text: `
New Free Quote Request

Customer Email: ${email}
Phone Number: ${phone}
Product Brand: ${brand}

Submitted from The Leather Laundry website.
      `,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 24px;
            background: #ffffff;
            color: #222222;
          "
        >
          <h2
            style="
              margin: 0 0 24px;
              font-size: 24px;
            "
          >
            New Free Quote Request
          </h2>

          <table
            style="
              width: 100%;
              border-collapse: collapse;
              font-size: 15px;
            "
          >
            <tr>
              <td
                style="
                  padding: 12px;
                  font-weight: 600;
                  border-bottom: 1px solid #eeeeee;
                "
              >
                Customer Email
              </td>

              <td
                style="
                  padding: 12px;
                  border-bottom: 1px solid #eeeeee;
                "
              >
                ${email}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 12px;
                  font-weight: 600;
                  border-bottom: 1px solid #eeeeee;
                "
              >
                Phone Number
              </td>

              <td
                style="
                  padding: 12px;
                  border-bottom: 1px solid #eeeeee;
                "
              >
                ${phone}
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 12px;
                  font-weight: 600;
                  border-bottom: 1px solid #eeeeee;
                "
              >
                Product Brand
              </td>

              <td
                style="
                  padding: 12px;
                  border-bottom: 1px solid #eeeeee;
                "
              >
                ${brand}
              </td>
            </tr>
          </table>

          <p
            style="
              margin-top: 24px;
              color: #777777;
              font-size: 13px;
            "
          >
            This enquiry was submitted through the
            Free Quote form on The Leather Laundry website.
          </p>
        </div>
      `,
    });

    console.log("Promo email sent successfully.");

    return NextResponse.json({
      ok: true,
      message: "Your request has been submitted successfully.",
    });
  } catch (error) {
    console.error("Promo mailer error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to send your request. Please try again.",
      },
      { status: 500 }
    );
  }
}