export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Send SMS notification via Telnyx
    await fetch('https://api.telnyx.com/v2/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TELNYX_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.TELNYX_PHONE_NUMBER,
        to: process.env.NOTIFY_PHONE_NUMBER,
        text: `New Website Form!\n\nBusiness: ${data.businessName}\nEmail: ${data.email}\nPhone: ${data.phone}\nLocation: ${data.locations}`,
      }),
    });

    console.log('Form submission:', data);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false });
  }
}
