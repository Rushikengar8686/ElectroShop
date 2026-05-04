import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const CATEGORIES = ['All', 'Mobile', 'Laptop', 'Accessories'];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await fetchProducts();
      setProducts(data.products);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = (deletedId) => {
    setProducts((prev) => prev.filter((p) => p._id !== deletedId));
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filter === 'All' || product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1 className="page-title">Electronics Catalog</h1>
          <p className="page-subtitle">
            {products.length} product{products.length !== 1 ? 's' : ''} available
          </p>
        </div>
        {user && (
          <Link to="/products/new" className="btn-add-product">
            + Add Product
          </Link>
        )}
      </div>

      <div className="products-controls">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="category-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📦</span>
          <h3>No products found</h3>
          <p>
            {search || filter !== 'All'
              ? 'Try adjusting your filters'
              : user
              ? 'Be the first to add a product!'
              : 'Login to add products'}
          </p>
          {user && (
            <Link to="/products/new" className="btn-submit" style={{ display: 'inline-block', marginTop: '1rem' }}>
              Add First Product
            </Link>
          )}
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
