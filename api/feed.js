export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Abhi ke liye sample verified items bhej rahe hain taaki feed khali na lage
    const items = [
      {
        nodeId: "000,142",
        persona: "ANONYMOUS",
        confession: "System initialized. Secure channels active."
      }
    ];

    return res.status(200).json({ success: true, items: items });

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
