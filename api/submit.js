export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { utr, confession } = req.body;

    if (!utr || !/^\d{12}$/.test(utr)) {
      return res.status(400).json({ error: 'Invalid 12-digit UTR number' });
    }

    if (!confession || confession.length < 10) {
      return res.status(400).json({ error: 'Confession is too short' });
    }

    const submissionId = 'bl_' + Math.random().toString(36).substring(2, 9);
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Telegram Bot Details
    const TELEGRAM_BOT_TOKEN = '8613205485:AAHBEE3qHwVwL5AhCuhh6_SgFCPowIAWqQs';
    const TELEGRAM_CHAT_ID = '7499975513';

    const message = `🔔 New UTR Submission!\n\nUTR: ${utr}\nConfession: ${confession}\nSubmission ID: ${submissionId}\nStatus: Pending`;

    try {
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        })
      });
    } catch (tgError) {
      console.error('Failed to send Telegram notification', tgError);
    }

    return res.status(200).json({
      success: true,
      submissionId: submissionId,
      token: token,
      message: 'Trace submitted successfully. Awaiting admin verification.'
    });

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


