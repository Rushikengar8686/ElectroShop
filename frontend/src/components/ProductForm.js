import React, { useState } from 'react';

const CATEGORIES = ['Mobile', 'Laptop', 'Accessories'];

const ProductForm = ({ initialData = {}, onSubmit, loading, submitLabel = 'Save Product' }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    category: initialData.category || '',
    price: initialData.price || '',
    stock: initialData.stock ?? '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (formData.price === '' || formData.price === undefined) newErrors.price = 'Price is required';
    else if (Number(formData.price) < 0) newErrors.price = 'Price cannot be negative';
    if (formData.stock === '' || formData.stock === undefined) newErrors.stock = 'Stock is required';
    else if (Number(formData.stock) < 0) newErrors.stock = 'Stock cannot be negative';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`form-input ${errors.name ? 'input-error' : ''}`}
          placeholder="e.g. Samsung Galaxy S24"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.name && <span className="error-msg">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          name="category"
          className={`form-input ${errors.category ? 'input-error' : ''}`}
          value={formData.category}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="">-- Select Category --</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <span className="error-msg">{errors.category}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price (₹)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className={`form-input ${errors.price ? 'input-error' : ''}`}
            placeholder="e.g. 49999"
            value={formData.price}
            onChange={handleChange}
            min="0"
            disabled={loading}
          />
          {errors.price && <span className="error-msg">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="stock" className="form-label">
            Stock Quantity
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            className={`form-input ${errors.stock ? 'input-error' : ''}`}
            placeholder="e.g. 100"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            disabled={loading}
          />
          {errors.stock && <span className="error-msg">{errors.stock}</span>}
        </div>
      </div>

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? (
          <>
            <span className="btn-spinner" /> Processing...
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
};

export default ProductForm;
