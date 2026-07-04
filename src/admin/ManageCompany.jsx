import { useState, useEffect } from 'react';
import { HiSave } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useData } from '../context/DataContext';

export default function ManageCompany() {
  const { companyInfo, updateCompanyInfo } = useData();
  const [form, setForm] = useState(() => JSON.parse(JSON.stringify(companyInfo)));

  // Re-sync form when companyInfo changes externally (e.g., cross-tab sync or reset)
  useEffect(() => {
    setForm(JSON.parse(JSON.stringify(companyInfo)));
  }, [companyInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields
    if (name.startsWith('stats.')) {
      const key = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        stats: { ...prev.stats, [key]: value },
      }));
    } else if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleValuesChange = (e) => {
    const values = e.target.value.split(',').map((v) => v.trim()).filter(Boolean);
    setForm((prev) => ({ ...prev, values }));
  };

  const handleWhyChooseUsChange = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      whyChooseUs: prev.whyChooseUs.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCompanyInfo(form);
    toast.success('Company info updated successfully');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Company Information</h1>
        <p className="text-dark-400 mt-1">Update your company details, stats, and social links.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="admin-card space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-dark-700 pb-3">
            Basic Information
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Company Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Tagline</label>
              <input
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Hero Title</label>
            <input
              name="heroTitle"
              value={form.heroTitle}
              onChange={handleChange}
              className="admin-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Hero Subtitle</label>
            <textarea
              name="heroSubtitle"
              value={form.heroSubtitle}
              onChange={handleChange}
              rows={3}
              className="admin-textarea"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">About Text</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              rows={6}
              className="admin-textarea"
            />
            <p className="text-dark-500 text-xs mt-1">Use double newlines to separate paragraphs</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Mission</label>
              <textarea
                name="mission"
                value={form.mission}
                onChange={handleChange}
                rows={3}
                className="admin-textarea"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Vision</label>
              <textarea
                name="vision"
                value={form.vision}
                onChange={handleChange}
                rows={3}
                className="admin-textarea"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Values <span className="text-dark-500">(comma-separated)</span>
            </label>
            <input
              value={form.values?.join(', ') || ''}
              onChange={handleValuesChange}
              className="admin-input"
              placeholder="Innovation, Excellence, Integrity"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="admin-card space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-dark-700 pb-3">
            Contact Information
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="admin-input"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="admin-card space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-dark-700 pb-3">
            Statistics
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Projects</label>
              <input
                name="stats.projects"
                value={form.stats?.projects || ''}
                onChange={handleChange}
                className="admin-input"
                placeholder="50+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Clients</label>
              <input
                name="stats.clients"
                value={form.stats?.clients || ''}
                onChange={handleChange}
                className="admin-input"
                placeholder="30+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Team</label>
              <input
                name="stats.teamMembers"
                value={form.stats?.teamMembers || ''}
                onChange={handleChange}
                className="admin-input"
                placeholder="25+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Years</label>
              <input
                name="stats.yearsExperience"
                value={form.stats?.yearsExperience || ''}
                onChange={handleChange}
                className="admin-input"
                placeholder="5+"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="admin-card space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-dark-700 pb-3">
            Social Media Links
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {['facebook', 'linkedin', 'instagram', 'twitter'].map((platform) => (
              <div key={platform}>
                <label className="block text-sm font-medium text-dark-300 mb-2 capitalize">
                  {platform}
                </label>
                <input
                  name={`socialLinks.${platform}`}
                  value={form.socialLinks?.[platform] || ''}
                  onChange={handleChange}
                  className="admin-input"
                  placeholder={`https://${platform}.com/infoaxon`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="admin-card space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-dark-700 pb-3">
            Why Choose Us
          </h2>

          {(form.whyChooseUs || []).map((item, i) => (
            <div key={i} className="bg-dark-900 rounded-lg p-4 space-y-3">
              <div className="text-xs font-semibold text-dark-500 uppercase">Item {i + 1}</div>
              <input
                value={item.title}
                onChange={(e) => handleWhyChooseUsChange(i, 'title', e.target.value)}
                placeholder="Title"
                className="admin-input"
              />
              <textarea
                value={item.description}
                onChange={(e) => handleWhyChooseUsChange(i, 'description', e.target.value)}
                placeholder="Description"
                rows={3}
                className="admin-textarea"
              />
            </div>
          ))}
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button type="submit" className="admin-btn-primary flex items-center gap-2 px-8">
            <HiSave size={18} />
            Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
}
