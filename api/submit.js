export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { utr, confession } = req.body;
    const submissionId = Date.now().toString();

    // Pipedream Webhook URL
    const pipedreamUrl = "https://eo87xe2rdgwnv12.m.pipedream.net";

    const response = await fetch(pipedreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        submissionId,
        utr,
        confession
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true, submissionId });
    } else {
      throw new Error('Failed to forward to webhook');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

