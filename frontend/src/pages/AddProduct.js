import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../utils/api';
import ProductForm from '../components/ProductForm';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const { data } = await createProduct(formData);
      toast.success('Product added successfully! 🎉');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-page-header">
        <button className="btn-back" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h2 className="page-title">Add New Product</h2>
        <p className="page-subtitle">Fill in the details to list a new electronics item</p>
      </div>
      <div className="form-card">
        <ProductForm
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Add Product"
        />
      </div>
    </div>
  );
};

export default AddProduct;
