import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COUNTRY_CODE_REGEX = /^\+\d{1,4}$/;
const PHONE_REGEX = /^\d{6,14}$/;

export function normalizePayload(body = {}) {
  return {
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    countryCode: String(body.countryCode ?? "+91"),
    whatsapp: String(body.whatsapp ?? ""),
    message: String(body.message ?? ""),
  };
}

export function validatePayload(payload) {
  const errors = {};

  if (!payload.name?.trim()) errors.name = "Name is required.";
  if (!payload.email?.trim()) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(payload.email.trim())) errors.email = "Valid email is required.";

  if (!payload.countryCode?.trim()) errors.countryCode = "Country code is required.";
  else if (!COUNTRY_CODE_REGEX.test(payload.countryCode.trim())) {
    errors.countryCode = "Valid country code is required.";
  }

  if (!payload.whatsapp?.trim()) errors.whatsapp = "WhatsApp number is required.";
  else if (!PHONE_REGEX.test(payload.whatsapp.trim())) {
    errors.whatsapp = "WhatsApp number must be 6 to 14 digits.";
  }

  if (!payload.message?.trim()) errors.message = "Message is required.";

  return errors;
}

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, FROM_EMAIL, TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !FROM_EMAIL || !TO_EMAIL) {
    throw new Error("SMTP configuration is incomplete.");
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export async function sendContactInquiry(payload) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    replyTo: payload.email.trim(),
    subject: "New Website Inquiry - Intellcore technologies",
    text: [
      `Name: ${payload.name.trim()}`,
      `Email: ${payload.email.trim()}`,
      `WhatsApp: ${payload.countryCode.trim()} ${payload.whatsapp.trim()}`,
      "Message:",
      payload.message.trim(),
    ].join("\n"),
  });
}
