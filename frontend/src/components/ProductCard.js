import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { deleteProduct } from '../utils/api';
import toast from 'react-hot-toast';

const CATEGORY_ICONS = {
  Mobile: '📱',
  Laptop: '💻',
  Accessories: '🎧',
};

const CATEGORY_COLORS = {
  Mobile: '#3b82f6',
  Laptop: '#8b5cf6',
  Accessories: '#10b981',
};

const ProductCard = ({ product, onDelete }) => {
  const { isOwner, user } = useAuth();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const ownerCheck = isOwner(product.createdBy);

  const handleEdit = () => {
    navigate(`/products/edit/${product._id}`);
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await deleteProduct(product._id);
      toast.success('Product deleted successfully');
      onDelete(product._id);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="product-card">
      <div
        className="product-card-header"
        style={{ borderColor: CATEGORY_COLORS[product.category] }}
      >
        <span className="product-category-icon">{CATEGORY_ICONS[product.category]}</span>
        <span
          className="product-category-badge"
          style={{ backgroundColor: CATEGORY_COLORS[product.category] + '20', color: CATEGORY_COLORS[product.category] }}
        >
          {product.category}
        </span>
      </div>

      <div className="product-card-body">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-details">
          <div className="product-price">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </div>
          <div className={`product-stock ${product.stock === 0 ? 'out-of-stock' : product.stock < 5 ? 'low-stock' : 'in-stock'}`}>
            {product.stock === 0
              ? '❌ Out of Stock'
              : product.stock < 5
              ? `⚠️ Only ${product.stock} left`
              : `✅ ${product.stock} in stock`}
          </div>
        </div>
        <div className="product-creator">
          <span className="creator-label">Added by:</span>
          <span className="creator-name">
            {product.createdBy?.name || 'Unknown'}
            {ownerCheck && <span className="you-badge"> (You)</span>}
          </span>
        </div>
      </div>

      {/* Conditional Rendering: Show Edit/Delete ONLY if logged-in user is the owner */}
      {user && ownerCheck && (
        <div className="product-card-actions">
          {!showConfirm ? (
            <>
              <button className="btn-edit" onClick={handleEdit}>
                ✏️ Edit
              </button>
              <button className="btn-delete" onClick={() => setShowConfirm(true)}>
                🗑️ Delete
              </button>
            </>
          ) : (
            <div className="confirm-delete">
              <p>Are you sure?</p>
              <div className="confirm-btns">
                <button
                  className="btn-confirm-yes"
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button
                  className="btn-confirm-no"
                  onClick={() => setShowConfirm(false)}
                  disabled={deleting}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
