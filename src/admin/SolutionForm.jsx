import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiArrowLeft, HiSave, HiPlus, HiX } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useData } from '../context/DataContext';

const colorOptions = [
  { value: 'from-blue-500 to-cyan-500', label: 'Blue → Cyan' },
  { value: 'from-purple-500 to-pink-500', label: 'Purple → Pink' },
  { value: 'from-green-500 to-emerald-500', label: 'Green → Emerald' },
  { value: 'from-orange-500 to-red-500', label: 'Orange → Red' },
  { value: 'from-indigo-500 to-violet-500', label: 'Indigo → Violet' },
];

const iconOptions = [
  { value: 'erp', label: 'ERP/Cube' },
  { value: 'crm', label: 'CRM/Users' },
  { value: 'ecommerce', label: 'E-Commerce/Cart' },
  { value: 'mobile', label: 'Mobile/Phone' },
  { value: 'bespoke', label: 'Custom Software/Cog' },
];

const emptyForm = {
  title: '',
  shortTitle: '',
  description: '',
  icon: 'bespoke',
  color: 'from-blue-500 to-cyan-500',
  features: [],
};

export default function SolutionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { solutions, addSolution, updateSolution } = useData();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    if (isEdit) {
      const existing = solutions.find((s) => s.id === id);
      if (existing) {
        setForm(existing);
      } else {
        toast.error('Solution not found');
        navigate('/admin/solutions');
      }
    }
  }, [id, isEdit, solutions, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setForm((prev) => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const slugId = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    if (isEdit) {
      updateSolution(id, form);
      toast.success('Solution updated successfully');
    } else {
      addSolution({ ...form, id: slugId });
      toast.success('Solution created successfully');
    }

    navigate('/admin/solutions');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/solutions')}
          className="admin-btn-secondary p-2"
        >
          <HiArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? 'Edit Solution' : 'New Solution'}
          </h1>
          <p className="text-dark-400 mt-1">
            {isEdit ? 'Update this service offering' : 'Create a new service offering'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="admin-card space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g., Custom ERP & Smart POS Systems"
              className="admin-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Short Title</label>
            <input
              name="shortTitle"
              value={form.shortTitle}
              onChange={handleChange}
              placeholder="e.g., ERP & POS"
              className="admin-input"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Describe this service..."
            className="admin-textarea"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Icon</label>
            <select
              name="icon"
              value={form.icon}
              onChange={handleChange}
              className="admin-input appearance-none"
            >
              {iconOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Color Theme</label>
            <select
              name="color"
              value={form.color}
              onChange={handleChange}
              className="admin-input appearance-none"
            >
              {colorOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">Features</label>
          <div className="flex gap-2 mb-3">
            <input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              placeholder="Add a feature..."
              className="admin-input flex-1"
            />
            <button
              type="button"
              onClick={addFeature}
              className="admin-btn-secondary flex items-center gap-1 px-4"
            >
              <HiPlus size={18} />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(form.features || []).map((feature, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full bg-dark-900 border border-dark-700 text-dark-300 text-sm flex items-center gap-2"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => removeFeature(i)}
                  className="text-dark-500 hover:text-red-400 transition-colors"
                >
                  <HiX size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-dark-700">
          <button
            type="button"
            onClick={() => navigate('/admin/solutions')}
            className="admin-btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="admin-btn-primary flex items-center gap-2">
            <HiSave size={18} />
            {isEdit ? 'Update Solution' : 'Create Solution'}
          </button>
        </div>
      </form>
    </div>
  );
}
