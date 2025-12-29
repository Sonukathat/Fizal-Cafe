import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminAPI } from '../services/api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        adminAPI.getAllProducts(),
        adminAPI.getAllCategories()
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error loading data. Make sure you are logged in as admin.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      stock: ''
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item, type) => {
    if (type === 'product') {
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        category: item.category._id || item.category,
        stock: item.stock
      });
      setEditingItem({ id: item._id, type: 'product' });
    } else {
      setFormData({
        name: item.name,
        description: item.description || ''
      });
      setEditingItem({ id: item._id, type: 'category' });
    }
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        // Update existing item
        if (editingItem.type === 'product') {
          await adminAPI.updateProduct(editingItem.id, formData);
        } else {
          await adminAPI.updateCategory(editingItem.id, formData);
        }
      } else {
        // Create new item
        if (activeTab === 'products') {
          await adminAPI.createProduct(formData);
        } else {
          await adminAPI.createCategory(formData);
        }
      }
      resetForm();
      loadData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving item');
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      if (type === 'product') {
        await adminAPI.deleteProduct(id);
      } else {
        await adminAPI.deleteCategory(id);
      }
      loadData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting item');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white flex items-center justify-center pt-24">
        <div className="text-2xl text-coffee-700">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-cream-50 to-white pt-24 pb-6 md:pb-12"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-coffee-800 text-center"
        >
          Admin Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-coffee-600 mb-6 md:mb-10 text-base md:text-lg"
        >
          Manage your cafe menu
        </motion.p>

        {/* Tabs */}
        <div className="flex space-x-2 md:space-x-4 mb-6 md:mb-8 border-b-2 border-coffee-200 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('products');
              resetForm();
            }}
            className={`px-4 py-2 md:px-6 md:py-3 font-bold text-sm md:text-lg transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-b-4 border-coffee-700 text-coffee-800'
                : 'text-coffee-600 hover:text-coffee-800'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => {
              setActiveTab('categories');
              resetForm();
            }}
            className={`px-4 py-2 md:px-6 md:py-3 font-bold text-sm md:text-lg transition-all whitespace-nowrap ${
              activeTab === 'categories'
                ? 'border-b-4 border-coffee-700 text-coffee-800'
                : 'text-coffee-600 hover:text-coffee-800'
            }`}
          >
            Categories
          </button>
        </div>

        {/* Add Button */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-gradient-to-r from-coffee-600 to-coffee-700 text-white px-4 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl font-bold text-sm md:text-base hover:from-coffee-700 hover:to-coffee-800 transition-all shadow-lg hover:shadow-xl"
          >
            + Add New {activeTab === 'products' ? 'Product' : 'Category'}
          </button>
        </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-cream-50 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 max-w-md w-full shadow-2xl border-2 border-coffee-200 my-4"
            >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-coffee-800">
              {editingItem ? 'Edit' : 'Add'} {activeTab === 'products' ? 'Product' : 'Category'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block font-bold mb-2 text-coffee-800">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-coffee-200 rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800"
                />
              </div>

              <div className="mb-5">
                <label className="block font-bold mb-2 text-coffee-800">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required={activeTab === 'products'}
                  className="w-full px-4 py-3 border-2 border-coffee-200 rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800"
                  rows="3"
                />
              </div>

              {activeTab === 'products' && (
                <>
                  <div className="mb-5">
                    <label className="block font-bold mb-2 text-coffee-800">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 border-2 border-coffee-200 rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block font-bold mb-2 text-coffee-800">Image URL</label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-coffee-200 rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block font-bold mb-2 text-coffee-800">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-coffee-200 rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-5">
                    <label className="block font-bold mb-2 text-coffee-800">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-3 border-2 border-coffee-200 rounded-xl focus:outline-none focus:border-coffee-500 bg-white text-coffee-800"
                    />
                  </div>
                </>
              )}

              <div className="flex space-x-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-coffee-600 to-coffee-700 text-white py-3 rounded-xl font-bold hover:from-coffee-700 hover:to-coffee-800 transition-all shadow-lg"
                >
                  {editingItem ? 'Update' : 'Create'}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={resetForm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-cream-200 text-coffee-700 py-3 rounded-xl font-bold hover:bg-cream-300 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* List Items */}
      <div className="bg-cream-50 rounded-xl md:rounded-2xl shadow-xl overflow-hidden border border-coffee-200 overflow-x-auto">
        {activeTab === 'products' ? (
          <table className="w-full min-w-[600px]">
            <thead className="bg-gradient-to-r from-coffee-700 to-coffee-800 text-cream-50">
              <tr>
                <th className="px-3 py-2 md:px-6 md:py-4 text-left font-bold text-xs md:text-base">Name</th>
                <th className="px-3 py-2 md:px-6 md:py-4 text-left font-bold text-xs md:text-base">Price</th>
                <th className="px-3 py-2 md:px-6 md:py-4 text-left font-bold text-xs md:text-base">Stock</th>
                <th className="px-3 py-2 md:px-6 md:py-4 text-left font-bold text-xs md:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-b border-coffee-200 hover:bg-cream-100 transition-colors">
                  <td className="px-3 py-2 md:px-6 md:py-4 text-coffee-800 font-semibold text-sm md:text-base">{product.name}</td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-coffee-700 font-bold text-sm md:text-base">${product.price}</td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-coffee-700 text-sm md:text-base">{product.stock}</td>
                  <td className="px-3 py-2 md:px-6 md:py-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleEdit(product, 'product')}
                        className="text-coffee-700 hover:text-coffee-800 font-semibold hover:underline text-xs md:text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id, 'product')}
                        className="text-amber-600 hover:text-amber-700 font-semibold hover:underline text-xs md:text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full min-w-[500px]">
            <thead className="bg-gradient-to-r from-coffee-700 to-coffee-800 text-cream-50">
              <tr>
                <th className="px-3 py-2 md:px-6 md:py-4 text-left font-bold text-xs md:text-base">Name</th>
                <th className="px-3 py-2 md:px-6 md:py-4 text-left font-bold text-xs md:text-base hidden md:table-cell">Description</th>
                <th className="px-3 py-2 md:px-6 md:py-4 text-left font-bold text-xs md:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category._id} className="border-b border-coffee-200 hover:bg-cream-100 transition-colors">
                  <td className="px-3 py-2 md:px-6 md:py-4 text-coffee-800 font-semibold text-sm md:text-base">{category.name}</td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-coffee-600 text-sm md:text-base hidden md:table-cell">{category.description || '-'}</td>
                  <td className="px-3 py-2 md:px-6 md:py-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleEdit(category, 'category')}
                        className="text-coffee-700 hover:text-coffee-800 font-semibold hover:underline text-xs md:text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category._id, 'category')}
                        className="text-amber-600 hover:text-amber-700 font-semibold hover:underline text-xs md:text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;

