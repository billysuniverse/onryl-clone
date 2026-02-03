import { NextResponse } from "next/server";
import { sendTwilioMessage, type TwilioSendOptions } from "@/lib/twilio-server";

type SendRequest = {
  to?: string;
  body?: string;
  options?: TwilioSendOptions;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SendRequest;
    const to = payload.to?.trim();
    const body = payload.body?.trim();

    if (!to || !body) {
      return NextResponse.json(
        { success: false, error: "Missing destination number or message body." },
        { status: 400 }
      );
    }

    const message = await sendTwilioMessage({ to, body, options: payload.options });

    return NextResponse.json({
      success: true,
      messageSid: message.sid,
      status: message.status,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send message.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
