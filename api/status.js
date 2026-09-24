export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, token } = req.query;

    if (!id || !token) {
      return res.status(400).json({ error: 'Missing id or token' });
    }

    // Abhi ke liye hum ise 'pending' state bhej rahe hain jab tak admin verify na kare
    return res.status(200).json({
      status: 'pending', // Jab aap admin panel se verify karoge toh ye 'verified' ho jayega
      nodeId: '000,142',
      persona: 'ANONYMOUS'
    });

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
