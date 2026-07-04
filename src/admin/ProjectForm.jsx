import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiArrowLeft, HiSave, HiPlus, HiX } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useData } from '../context/DataContext';

const emptyForm = {
  title: '',
  client: '',
  category: '',
  description: '',
  technologies: [],
  results: [],
  featured: false,
};

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, addProject, updateProject } = useData();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [newTech, setNewTech] = useState('');
  const [newResult, setNewResult] = useState('');

  useEffect(() => {
    if (isEdit) {
      const existing = projects.find((p) => p.id === id);
      if (existing) {
        setForm(existing);
      } else {
        toast.error('Project not found');
        navigate('/admin/projects');
      }
    }
  }, [id, isEdit, projects, navigate]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const addItem = (field, value, setter) => {
    if (value.trim()) {
      setForm((prev) => ({
        ...prev,
        [field]: [...(prev[field] || []), value.trim()],
      }));
      setter('');
    }
  };

  const removeItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim() || !form.client.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const slugId = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    if (isEdit) {
      updateProject(id, form);
      toast.success('Project updated successfully');
    } else {
      addProject({ ...form, id: slugId });
      toast.success('Project created successfully');
    }

    navigate('/admin/projects');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/projects')}
          className="admin-btn-secondary p-2"
        >
          <HiArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? 'Edit Project' : 'New Project'}
          </h1>
          <p className="text-dark-400 mt-1">
            {isEdit ? 'Update this case study' : 'Create a new case study / portfolio item'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="admin-card space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Project Title <span className="text-red-400">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g., AutoCool POS System"
              className="admin-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Client <span className="text-red-400">*</span>
            </label>
            <input
              name="client"
              value={form.client}
              onChange={handleChange}
              required
              placeholder="e.g., Vehicle AC Repair Center"
              className="admin-input"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g., Automobile & Retail"
              className="admin-input"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-5 h-5 rounded bg-dark-900 border-dark-700 text-primary-500 focus:ring-primary-500 focus:ring-offset-dark-900"
              />
              <div>
                <div className="text-sm font-medium text-dark-300">Featured Project</div>
                <div className="text-xs text-dark-500">Show on homepage</div>
              </div>
            </label>
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
            placeholder="Describe the project, challenges, and solutions..."
            className="admin-textarea"
          />
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">Technologies</label>
          <div className="flex gap-2 mb-3">
            <input
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('technologies', newTech, setNewTech))}
              placeholder="Add a technology..."
              className="admin-input flex-1"
            />
            <button
              type="button"
              onClick={() => addItem('technologies', newTech, setNewTech)}
              className="admin-btn-secondary flex items-center gap-1 px-4"
            >
              <HiPlus size={18} />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(form.technologies || []).map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full bg-dark-900 border border-dark-700 text-dark-300 text-sm flex items-center gap-2"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeItem('technologies', i)}
                  className="text-dark-500 hover:text-red-400 transition-colors"
                >
                  <HiX size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Key Results */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">Key Results</label>
          <div className="flex gap-2 mb-3">
            <input
              value={newResult}
              onChange={(e) => setNewResult(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('results', newResult, setNewResult))}
              placeholder="Add a key result..."
              className="admin-input flex-1"
            />
            <button
              type="button"
              onClick={() => addItem('results', newResult, setNewResult)}
              className="admin-btn-secondary flex items-center gap-1 px-4"
            >
              <HiPlus size={18} />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(form.results || []).map((result, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full bg-dark-900 border border-dark-700 text-dark-300 text-sm flex items-center gap-2"
              >
                {result}
                <button
                  type="button"
                  onClick={() => removeItem('results', i)}
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
            onClick={() => navigate('/admin/projects')}
            className="admin-btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="admin-btn-primary flex items-center gap-2">
            <HiSave size={18} />
            {isEdit ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
