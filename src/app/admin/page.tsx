'use client';

import { useState, useEffect } from 'react';

interface UploadItem {
  id: number;
  filename: string;
  url: string;
  uploaded_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedRoute, setSelectedRoute] = useState<string>('/');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isCustomEnabled, setIsCustomEnabled] = useState<boolean>(false);

  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const routesList = [
    { label: 'Home (/)', value: '/' },
    { label: 'About (/about)', value: '/about' },
    { label: 'Journey (/journey)', value: '/journey' },
    { label: 'Eco Store (/shop)', value: '/shop' },
    { label: 'Sign Up (/sign-up)', value: '/sign-up' },
    { label: 'Careers (/joinus)', value: '/joinus' },
    { label: 'Contact Us (/contact-2)', value: '/contact-2' },
    { label: 'FAQ (/faq-2)', value: '/faq-2' },
    { label: 'Privacy (/privacy-cookie)', value: '/privacy-cookie' },
    { label: 'Principles (/principles)', value: '/principles' },
    { label: 'Ethics (/ethics)', value: '/ethics' },
    { label: 'Terms (/terms-support)', value: '/terms-support' },
    { label: 'Cancel Subscription (/cancel)', value: '/cancel' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setAuthError(data.message || 'Invalid password');
      }
    } catch {
      setAuthError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchPageContent = async (route: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/content?route=${encodeURIComponent(route)}`);
      const data = await res.json();
      if (data.success && data.data) {
        setTitle(data.data.title || '');
        setContent(data.data.content || '');
        setIsCustomEnabled(data.data.is_custom_content_enabled === 1);
      }
    } catch (err) {
      console.error('Failed to fetch page content:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUploads = async () => {
    try {
      const res = await fetch('/api/content?route=uploads');
      const data = await res.json();
      if (data.success && data.uploads) {
        setUploads(data.uploads);
      }
    } catch (err) {
      console.error('Failed to fetch uploads:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPageContent(selectedRoute);
      fetchUploads();
    }
  }, [isAuthenticated, selectedRoute]);

  const handleMultipleFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    Array.from(e.target.files).forEach((file) => {
      formData.append('files', file);
    });

    try {
      const res = await fetch('/api/content/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        fetchUploads();
      } else {
        alert('Image upload failed: ' + data.message);
      }
    } catch (err) {
      alert('Upload error: ' + (err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveChanges = async () => {
    setSaveStatus('Saving changes...');
    try {
      const res = await fetch('/api/content/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_route: selectedRoute,
          title,
          content,
          is_custom_content_enabled: isCustomEnabled ? 1 : 0,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveStatus('Saved successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus('Failed to save.');
      }
    } catch (err) {
      setSaveStatus('Save error: ' + (err as Error).message);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Daily-admin CMS Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter admin password to manage HTML/CSS content and image assets
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm text-black"
                    placeholder="Default: admin123"
                  />
                </div>
              </div>

              {authError && (
                <div className="text-red-600 text-sm">{authError}</div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  {loading ? 'Authenticating...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans pb-16">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold tracking-tight text-black">
              Daily Admin Structured Content & Asset Manager
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
              Live Headless CMS
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {saveStatus && (
              <span className="text-sm font-medium text-emerald-600">
                {saveStatus}
              </span>
            )}
            <button
              onClick={handleSaveChanges}
              className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-2.5 rounded-lg text-sm shadow transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Route Selector & Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Select Page Route to Edit</h2>
            <p className="text-sm text-gray-500">
              Manage raw HTML/CSS content and toggle custom layout rendering.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white font-medium focus:ring-black focus:border-black text-black"
            >
              {routesList.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Page Content Editor */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Page Settings & HTML/CSS Content</h3>
              <p className="text-sm text-gray-500">Route: <code className="bg-gray-100 px-2 py-0.5 rounded text-black font-mono">{selectedRoute}</code></p>
            </div>
            <div className="flex items-center space-x-3 bg-gray-50 p-2.5 border border-gray-200 rounded-lg">
              <label htmlFor="toggle-custom" className="text-sm font-medium text-gray-800 cursor-pointer">
                Use Custom HTML/CSS Content
              </label>
              <input
                id="toggle-custom"
                type="checkbox"
                checked={isCustomEnabled}
                onChange={(e) => setIsCustomEnabled(e.target.checked)}
                className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black cursor-pointer"
              />
            </div>
          </div>

          {/* Title Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Page Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter page title..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-black focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          {/* Raw HTML & CSS Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                HTML & CSS Code (Insert HTML & inline <code>&lt;style&gt;</code> rules)
              </label>
              <span className="text-xs text-gray-400 font-mono">HTML / CSS Supported</span>
            </div>
            <textarea
              rows={14}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="<style> .hero { background: #f4f4f4; } </style>\n<div className='hero'> <h1>Welcome</h1> </div>"
              className="w-full border border-gray-300 rounded-lg p-4 font-mono text-xs leading-relaxed text-black bg-slate-900 text-emerald-400 focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Multiple Image Uploader & Asset Gallery */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Image Asset Uploader & Gallery</h3>
              <p className="text-sm text-gray-500">
                Upload multiple images. Click on any URL below to copy and paste into your HTML/CSS content.
              </p>
            </div>
            <div>
              <label className="cursor-pointer inline-flex items-center bg-black hover:bg-gray-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow transition-colors">
                {uploading ? 'Uploading...' : '📁 Upload Images'}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleMultipleFilesUpload}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          {/* Uploaded Gallery Grid */}
          {uploads.length === 0 ? (
            <div className="text-center py-8 text-gray-400 border border-dashed border-gray-300 rounded-lg">
              No uploaded images yet. Click &quot;Upload Images&quot; to add image assets.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploads.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex flex-col justify-between space-y-3">
                  <div className="w-full h-32 bg-gray-200 rounded overflow-hidden flex items-center justify-center relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.filename}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800 truncate" title={item.filename}>
                      {item.filename}
                    </p>
                    <p className="text-[10px] text-gray-400 font-mono truncate">{item.url}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(item.url)}
                    className="w-full text-xs bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium py-1.5 rounded transition-colors"
                  >
                    {copiedUrl === item.url ? '✓ Copied URL!' : '📋 Copy Image URL'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
