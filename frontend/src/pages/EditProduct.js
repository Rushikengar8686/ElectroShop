import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProduct, updateProduct } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import ProductForm from '../components/ProductForm';
import toast from 'react-hot-toast';

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOwner } = useAuth();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await fetchProduct(id);
        // Authorization check on frontend
        if (!isOwner(data.product.createdBy)) {
          toast.error('You are not authorized to edit this product');
          navigate('/');
          return;
        }
        setProduct(data.product);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Product not found');
        navigate('/');
      } finally {
        setFetchLoading(false);
      }
    };
    loadProduct();
  }, [id, isOwner, navigate]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await updateProduct(id, formData);
      toast.success('Product updated successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-page-header">
        <button className="btn-back" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h2 className="page-title">Edit Product</h2>
        <p className="page-subtitle">Update the details for "{product?.name}"</p>
      </div>
      <div className="form-card">
        {product && (
          <ProductForm
            initialData={product}
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="Update Product"
          />
        )}
      </div>
    </div>
  );
};

export default EditProduct;
