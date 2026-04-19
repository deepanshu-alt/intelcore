import { normalizePayload, sendContactInquiry, validatePayload } from "../../contactApi.js";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: false,
        message: "Method not allowed.",
      }),
    };
  }

  try {
    const payload = normalizePayload(event.body ? JSON.parse(event.body) : {});
    const errors = validatePayload(payload);

    if (Object.keys(errors).length > 0) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          success: false,
          errors,
        }),
      };
    }

    await sendContactInquiry(payload);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        message: "Your inquiry has been sent successfully.",
      }),
    };
  } catch (error) {
    console.error("Netlify contact form send failed:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: false,
        message: "Unable to send your inquiry right now. Please try again shortly. or you can directly contact us at intellcoretechnologies@gmail.com",
      }),
    };
  }
}
