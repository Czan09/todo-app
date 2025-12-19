import { useState, useEffect } from 'react';
import { convertToBase64 } from '../utils/fileUtils'; 

export default function TodoForm({ initialData = {}, onSubmit, isEdit = false }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    image: ''
  });

  useEffect(() => {
    if (initialData.id) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'pending',
        image: initialData.image || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setFormData(prev => ({ ...prev, image: base64 }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
      <label>
        Title (Required):
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </label>

      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>

      <label>
        Status:
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <label>
        Image:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      
      {formData.image && <img src={formData.image} alt="Preview" style={{ width: '100px' }} />}

      <button type="submit">{isEdit ? 'Update Todo' : 'Create Todo'}</button>
    </form>
  );
}