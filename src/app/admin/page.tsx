'use client';

import { useState, useEffect } from 'react';

interface ContentItem {
  id: number;
  page_route: string;
  component_key: string;
  field_type: 'text' | 'textarea' | 'image';
  content_value: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState<ContentItem[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string>('all');
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  const routesList = [
    { label: 'All Pages', value: 'all' },
    { label: 'Global (Header/Footer)', value: 'global' },
    { label: 'Home (/)', value: '/' },
    { label: 'About (/about)', value: '/about' },
    { label: 'Store (/shop)', value: '/shop' },
    { label: 'Journey (/journey)', value: '/journey' },
    { label: 'Sign Up (/sign-up)', value: '/sign-up' },
    { label: 'Careers (/joinus)', value: '/joinus' },
    { label: 'Inquiries (/contact-2)', value: '/contact-2' },
    { label: 'FAQ (/faq-2)', value: '/faq-2' },
    { label: 'Privacy (/privacy-cookie)', value: '/privacy-cookie' },
    { label: 'Principles (/principles)', value: '/principles' },
    { label: 'Ethics (/ethics)', value: '/ethics' },
    { label: 'Terms (/terms-support)', value: '/terms-support' },
    { label: 'Cancel (/cancel)', value: '/cancel' },
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

  const fetchContent = async () => {
    setLoading(true);
    try {
      const routeParam = selectedRoute === 'all' ? '' : selectedRoute;
      const res = await fetch(`/api/content?route=${encodeURIComponent(routeParam)}`);
      const data = await res.json();
      if (data.success) {
        setItems(data.raw || []);
      }
    } catch (err) {
      console.error('Failed to fetch content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchContent();
    }
  }, [isAuthenticated, selectedRoute]);

  const handleInputChange = (id: number, newValue: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, content_value: newValue } : item))
    );
  };

  const handleFileUpload = async (id: number, file: File) => {
    setUploadingId(id);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/content/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        handleInputChange(id, data.url);
      } else {
        alert('Image upload failed: ' + data.message);
      }
    } catch (err) {
      alert('Upload error: ' + (err as Error).message);
    } finally {
      setUploadingId(null);
    }
  };

  const handleSaveChanges = async () => {
    setSaveStatus('Saving...');
    try {
      const updates = items.map((item) => ({
        id: item.id,
        content_value: item.content_value,
      }));

      const res = await fetch('/api/content/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });

      const data = await res.json();
      if (data.success) {
        setSaveStatus('Changes saved successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus('Failed to save changes.');
      }
    } catch (err) {
      setSaveStatus('Save error: ' + (err as Error).message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Daily-admin CMS Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter admin password to manage structured content
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

  const filteredItems =
    selectedRoute === 'all'
      ? items
      : items.filter((item) => item.page_route === selectedRoute);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans pb-16">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold tracking-tight text-black">
              Structured Content Editor
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
              className="bg-black hover:bg-gray-800 text-white font-semibold px-5 py-2.5 rounded-lg text-sm shadow transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Route Filter Dropdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Filter Content by Page</h2>
            <p className="text-sm text-gray-500">
              Select a route to manage its editable fields and assets.
            </p>
          </div>
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

        {/* Dynamic Form List */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading structured fields...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500">
            No content entries found for this route.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-gray-300 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-mono text-xs text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded">
                      {item.page_route}
                    </span>
                    <h3 className="text-md font-bold text-gray-900 mt-1">
                      {item.component_key}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 uppercase">
                    Field Type: {item.field_type}
                  </span>
                </div>

                {/* Field Controls */}
                {item.field_type === 'text' && (
                  <input
                    type="text"
                    value={item.content_value}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:ring-2 focus:ring-black focus:border-black"
                  />
                )}

                {item.field_type === 'textarea' && (
                  <textarea
                    rows={4}
                    value={item.content_value}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:ring-2 focus:ring-black focus:border-black"
                  />
                )}

                {item.field_type === 'image' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={item.content_value}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder="Image URL or relative path"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:ring-2 focus:ring-black focus:border-black"
                      />
                      <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-4 py-2.5 rounded-lg border border-gray-300 transition-colors">
                        {uploadingId === item.id ? 'Uploading...' : 'Upload Image'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(item.id, e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {item.content_value && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-500 mb-1">Preview:</p>
                        <div className="w-40 h-28 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.content_value}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
