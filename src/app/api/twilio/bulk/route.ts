import { NextResponse } from "next/server";
import { sendTwilioMessage, type TwilioSendOptions } from "@/lib/twilio-server";

type BulkRequest = {
  recipients?: string[];
  body?: string;
  options?: TwilioSendOptions;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as BulkRequest;
    const recipients = payload.recipients?.filter(Boolean) ?? [];
    const body = payload.body?.trim();

    if (!recipients.length || !body) {
      return NextResponse.json(
        { success: false, error: "Missing recipients or message body." },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      recipients.map(async (to) => {
        try {
          const message = await sendTwilioMessage({
            to,
            body,
            options: payload.options,
          });
          return {
            success: true,
            to,
            messageSid: message.sid,
            status: message.status,
          };
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to send message.";
          return {
            success: false,
            to,
            error: message,
          };
        }
      })
    );

    const sent = results.filter((result) => result.success).length;

    return NextResponse.json({
      success: sent === recipients.length,
      total: recipients.length,
      sent,
      failed: recipients.length - sent,
      results,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send bulk messages.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
