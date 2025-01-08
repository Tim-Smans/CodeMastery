type SendEmailResponse = {
  success: boolean;
  data?: unknown;
  error?: unknown;
};

export async function sendEmail(
  toEmail: string,
  username: string,
  subject: string
): Promise<SendEmailResponse> {
  try {
    const response = await fetch('http://localhost:3000/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ toEmail, username, subject }),
    });

    if (!response.ok) {
      const error: unknown = await response.json();
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    const data: unknown = await response.json();
    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Unexpected error:', errorMessage);
    return { success: false, error: errorMessage };
  }
}
