'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SignUpPage() {
  const [customContent, setCustomContent] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState('Sign Up for Daily Action');
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('Monthly Offset');
  const [statusMsg, setStatusMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchPage() {
      try {
        const res = await fetch('/api/content?route=/sign-up');
        const data = await res.json();
        if (data.success && data.data) {
          if (data.data.title) setPageTitle(data.data.title);
          if (data.data.is_custom_content_enabled && data.data.content) {
            setCustomContent(data.data.content);
          }
        }
      } catch (err) {
        console.error('Failed to load page content:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPage();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg('');

    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'signup',
          email,
          name,
          plan,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg(data.message || 'Subscription successfully created!');
        setName('');
        setEmail('');
      } else {
        setStatusMsg('Error: ' + (data.message || 'Failed to submit'));
      }
    } catch {
      setStatusMsg('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-black font-sans">
        <Header content={{}} />
        <main className="flex-1 max-w-[820px] mx-auto px-4 py-20 text-center">
          Loading...
        </main>
        <Footer content={{}} />
      </div>
    );
  }

  if (customContent) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-black font-sans">
        <Header content={{}} />
        <main
          className="flex-1 w-full"
          dangerouslySetInnerHTML={{ __html: customContent }}
        />
        <Footer content={{}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      <Header content={{}} />
      <main className="flex-1 max-w-[720px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-black mb-3">
            {pageTitle}
          </h1>
          <p className="text-gray-600 font-light">
            Start your climate journey today with simple, transparent monthly contributions.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-black focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-black focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Select Subscription Plan
              </label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-black focus:ring-2 focus:ring-black focus:border-black bg-white"
              >
                <option value="Monthly Offset">Monthly Carbon Offset (€5/mo)</option>
                <option value="Annual Offset">Annual Climate Plan (€50/yr)</option>
                <option value="Eco Toilet Paper Subscription">Eco Toilet Paper Delivery (€12/mo)</option>
              </select>
            </div>

            {statusMsg && (
              <div
                className={`p-4 rounded-lg text-sm font-medium ${
                  statusMsg.startsWith('Error')
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {statusMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 px-6 rounded-lg transition-colors text-sm shadow"
            >
              {isSubmitting ? 'Processing Subscription...' : 'Subscribe Now'}
            </button>
          </form>
        </div>
      </main>
      <Footer content={{}} />
    </div>
  );
}
