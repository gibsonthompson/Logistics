import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('website_form_submissions')
      .insert({
        business_name: data.businessName,
        tagline: data.tagline,
        locations: data.locations,
        company_history: data.companyHistory,
        services: data.services,
        differentiation: data.differentiation,
        problems: data.problems,
        results: data.results,
        ideal_client: data.idealClient,
        industries: data.industries,
        geographic: data.geographic,
        advantages: data.advantages,
        methods: data.methods,
        credentials: data.credentials,
        notable_clients: data.notableClients,
        process: data.process,
        email: data.email,
        phone: data.phone,
        logo_info: data.logoInfo,
        competitors: data.competitors,
      });

    if (dbError) {
      console.error('Supabase error:', dbError);
    }

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

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false });
  }
}
