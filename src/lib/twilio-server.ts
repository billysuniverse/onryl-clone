import twilio, { type MessageInstance } from "twilio";

export type TwilioSendOptions = {
  from?: string;
  messagingServiceSid?: string;
  statusCallback?: string;
  mediaUrl?: string | string[];
  safeMode?: boolean;
};

type TwilioCredentials = {
  accountSid: string;
  authToken: string;
};

const getTwilioCredentials = (): TwilioCredentials => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID?.trim();
  const authToken = process.env.TWILIO_AUTH_TOKEN?.trim();

  if (!accountSid || !authToken) {
    throw new Error("Twilio credentials are missing.");
  }

  return { accountSid, authToken };
};

const resolveMessagingSource = (options?: TwilioSendOptions) => {
  const from = options?.from?.trim();
  const messagingServiceSid = options?.messagingServiceSid?.trim()
    ?? process.env.TWILIO_MESSAGING_SERVICE_SID?.trim();

  if (from) {
    return { from };
  }

  if (messagingServiceSid) {
    return { messagingServiceSid };
  }

  throw new Error("A sender number or messaging service SID is required.");
};

export const sendTwilioMessage = async ({
  to,
  body,
  options,
}: {
  to: string;
  body: string;
  options?: TwilioSendOptions;
}): Promise<MessageInstance | { sid: string; status: string }> => {
  if (options?.safeMode) {
    return {
      sid: `simulated-${Date.now()}`,
      status: "simulated",
    };
  }

  const { accountSid, authToken } = getTwilioCredentials();
  const client = twilio(accountSid, authToken);
  const source = resolveMessagingSource(options);

  return client.messages.create({
    to,
    body,
    ...source,
    statusCallback: options?.statusCallback,
    mediaUrl: options?.mediaUrl,
  });
};
