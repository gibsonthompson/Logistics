'use client';

import { useState } from 'react';

export default function WebsiteFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      alert('There was an error submitting the form. Please try again or email us directly.');
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-500 p-10">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-12">
          <div className="text-center py-10">
            <h2 className="text-blue-800 text-2xl font-bold mb-5">✓ Form Submitted Successfully!</h2>
            <p className="text-gray-500 text-base">Thank you! We&apos;ve received your information and will be in touch soon.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-500 p-10 md:p-10 p-5">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-12 md:p-12 p-6">
        <h1 className="text-gray-800 text-3xl font-bold mb-2">Website Information Form</h1>
        <p className="text-gray-500 mb-10">Please fill out this form to help build your website</p>

        <form onSubmit={handleSubmit}>
          {/* Company Basics */}
          <div className="mb-10">
            <h2 className="text-blue-800 text-xl font-semibold mb-5 pb-2 border-b-2 border-gray-200">Company Basics</h2>
            
            <div className="mb-6">
              <label htmlFor="businessName" className="block text-gray-800 font-medium mb-2">Business Name *</label>
              <input type="text" id="businessName" name="businessName" required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none" />
            </div>

            <div className="mb-6">
              <label htmlFor="tagline" className="block text-gray-800 font-medium mb-2">Tagline</label>
              <input type="text" id="tagline" name="tagline" placeholder="Optional - your company's slogan or motto" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none" />
            </div>

            <div className="mb-6">
              <label htmlFor="locations" className="block text-gray-800 font-medium mb-2">Location(s) Served *</label>
              <input type="text" id="locations" name="locations" placeholder="e.g., Nationwide, surrounding states, etc." required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none" />
            </div>

            <div className="mb-6">
              <label htmlFor="companyHistory" className="block text-gray-800 font-medium mb-2">Brief Company History *</label>
              <textarea id="companyHistory" name="companyHistory" placeholder="2-3 sentences about how/why you started your consulting business" required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none min-h-[100px]" />
              <p className="text-sm text-gray-500 mt-1 italic">What inspired you to start? What problem were you solving?</p>
            </div>
          </div>

          {/* Services & Expertise */}
          <div className="mb-10">
            <h2 className="text-blue-800 text-xl font-semibold mb-5 pb-2 border-b-2 border-gray-200">Services & Expertise</h2>
            
            <div className="mb-6">
              <label htmlFor="services" className="block text-gray-800 font-medium mb-2">List All Consulting Services You Offer *</label>
              <textarea id="services" name="services" placeholder="e.g., Cost reduction strategies, Route optimization, DOT compliance, Fleet management, Technology implementation, etc." required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none min-h-[100px]" />
              <p className="text-sm text-gray-500 mt-1 italic">List all services you provide to trucking companies</p>
            </div>

            <div className="mb-6">
              <label htmlFor="differentiation" className="block text-gray-800 font-medium mb-2">What Makes Your Approach Different? *</label>
              <textarea id="differentiation" name="differentiation" placeholder="What sets you apart from other logistics consultants?" required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none min-h-[100px]" />
            </div>

            <div className="mb-6">
              <label htmlFor="problems" className="block text-gray-800 font-medium mb-2">What Specific Problems Do You Solve? *</label>
              <textarea id="problems" name="problems" placeholder="e.g., Reducing fuel costs by 15-20%, improving driver retention, streamlining compliance..." required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none min-h-[100px]" />
            </div>

            <div className="mb-6">
              <label htmlFor="results" className="block text-gray-800 font-medium mb-2">Typical Results/ROI Clients Can Expect *</label>
              <textarea id="results" name="results" placeholder="e.g., 20% cost reduction within 6 months, 30% improvement in route efficiency..." required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none min-h-[100px]" />
              <p className="text-sm text-gray-500 mt-1 italic">Include specific numbers or percentages if possible</p>
            </div>
          </div>

          {/* Target Client Information */}
          <div className="mb-10">
            <h2 className="text-blue-800 text-xl font-semibold mb-5 pb-2 border-b-2 border-gray-200">Target Client Information</h2>
            
            <div className="mb-6">
              <label htmlFor="idealClient" className="block text-gray-800 font-medium mb-2">Who Is Your Ideal Client? *</label>
              <textarea id="idealClient" name="idealClient" placeholder="e.g., Mid-sized trucking companies with 10-50 trucks, $2M-$10M annual revenue, long-haul freight..." required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none min-h-[100px]" />
              <p className="text-sm text-gray-500 mt-1 italic">Fleet size, revenue range, type of freight, etc.</p>
            </div>

            <div className="mb-6">
              <label htmlFor="industries" className="block text-gray-800 font-medium mb-2">Industries You Primarily Serve *</label>
              <input type="text" id="industries" name="industries" placeholder="e.g., General freight, refrigerated transport, specialized cargo..." required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none" />
            </div>

            <div className="mb-6">
              <label htmlFor="geographic" className="block text-gray-800 font-medium mb-2">Geographic Focus *</label>
              <input type="text" id="geographic" name="geographic" placeholder="e.g., Regional (Southeast), National, Specific states..." required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none" />
            </div>
          </div>

          {/* Value Proposition */}
          <div className="mb-10">
            <h2 className="text-blue-800 text-xl font-semibold mb-5 pb-2 border-b-2 border-gray-200">Value Proposition</h2>
            
            <div className="mb-6">
              <label htmlFor="advantages" className="block text-gray-800 font-medium mb-2">Your 3-5 Biggest Competitive Advantages *</label>
              <textarea id="advantages" name="advantages" placeholder="What are the top reasons clients should choose you?" required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none min-h-[100px]" />
            </div>

            <div className="mb-6">
              <label htmlFor="methods" className="block text-gray-800 font-medium mb-2">Proprietary Methods, Frameworks, or Technology</label>
              <textarea id="methods" name="methods" placeholder="Any unique processes or tools you use? (Optional)" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none min-h-[100px]" />
            </div>

            <div className="mb-6">
              <label htmlFor="credentials" className="block text-gray-800 font-medium mb-2">Industry Certifications, Credentials, or Affiliations</label>
              <textarea id="credentials" name="credentials" placeholder="e.g., DOT certifications, industry associations, professional memberships..." className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none min-h-[100px]" />
            </div>
          </div>

          {/* Notable Clients */}
          <div className="mb-10">
            <h2 className="text-blue-800 text-xl font-semibold mb-5 pb-2 border-b-2 border-gray-200">Notable Clients</h2>
            
            <div className="mb-6">
              <label htmlFor="notableClients" className="block text-gray-800 font-medium mb-2">Notable Clients You Can Mention</label>
              <textarea id="notableClients" name="notableClients" placeholder="List any well-known companies you've worked with (if allowed to mention publicly)" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none min-h-[100px]" />
              <p className="text-sm text-gray-500 mt-1 italic">Only include if you have permission to use their names</p>
            </div>
          </div>

          {/* Process */}
          <div className="mb-10">
            <h2 className="text-blue-800 text-xl font-semibold mb-5 pb-2 border-b-2 border-gray-200">Your Process</h2>
            
            <div className="mb-6">
              <label htmlFor="process" className="block text-gray-800 font-medium mb-2">How Does Your Consulting Engagement Typically Work? *</label>
              <textarea id="process" name="process" placeholder="e.g., Initial assessment (2 weeks), Strategy development, Implementation phase, Ongoing support..." required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none min-h-[100px]" />
              <p className="text-sm text-gray-500 mt-1 italic">Walk through the typical steps from first contact to results</p>
            </div>
          </div>

          {/* Contact & Branding */}
          <div className="mb-10">
            <h2 className="text-blue-800 text-xl font-semibold mb-5 pb-2 border-b-2 border-gray-200">Contact & Branding</h2>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-800 font-medium mb-2">Primary Contact Email *</label>
              <input type="email" id="email" name="email" required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none" />
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-gray-800 font-medium mb-2">Primary Contact Phone *</label>
              <input type="tel" id="phone" name="phone" required className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none" />
            </div>

            <div className="mb-6">
              <label htmlFor="logoInfo" className="block text-gray-800 font-medium mb-2">Logo Information</label>
              <textarea id="logoInfo" name="logoInfo" placeholder="Please send it separately to gibsonthompson1@gmail.com" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none min-h-[100px]" />
              <p className="text-sm text-gray-500 mt-1 italic">Please email your logo file (JPG, PNG, SVG, or PDF) separately</p>
            </div>

            <div className="mb-6">
              <label htmlFor="competitors" className="block text-gray-800 font-medium mb-2">Competitor or Example Websites You Like</label>
              <textarea id="competitors" name="competitors" placeholder="List any websites (competitors or other industries) whose design/layout you like" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:outline-none min-h-[100px]" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-br from-blue-800 to-blue-500 text-white py-4 px-10 text-base font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Information'}
          </button>
        </form>
      </div>
    </div>
  );
}
