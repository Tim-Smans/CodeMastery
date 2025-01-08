
import { EmailTemplate } from '@/components/mails/registerEmail';
import { Resend } from 'resend';
import * as React from 'react';


const resend = new Resend(process.env.API_KEY_MAIL);

interface RequestBody {
  toEmail: string;
  username: string;
  subject: string;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const requestBody = (await request.json()) as RequestBody;

    const { toEmail, username, subject } = requestBody;

    if (!toEmail) {
      return Response.json({ error: "Missing 'toEmail' field" }, { status: 400 });
    }

    // Sending the email
    const { data, error } = await resend.emails.send({
      from: 'Codemastery <noreply@timsmans.be>',
      to: [toEmail],
      subject,
      react: EmailTemplate({ username }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
