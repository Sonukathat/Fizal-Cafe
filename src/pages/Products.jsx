import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productsAPI, categoriesAPI } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productsAPI.getAll(selectedCategory || null),
        categoriesAPI.getAll()
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-3 sm:px-4 pt-24 pb-12 text-center">
        <div className="text-lg sm:text-xl md:text-2xl text-coffee-700">Loading products...</div>
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
      <div className="container mx-auto px-3 sm:px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-coffee-800 text-center"
        >
          Our Menu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-coffee-600 mb-6 md:mb-10 text-base md:text-lg px-2"
        >
          Discover our premium selection
        </motion.p>

        {/* Category Filter */}
        <div className="mb-6 md:mb-10">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            <Link
              to="/products"
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all ${
                !selectedCategory
                  ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                  : 'bg-cream-200 text-coffee-700 hover:bg-cream-300'
              }`}
            >
              All
            </Link>
            {categories.map(category => (
              <Link
                key={category._id}
                to={`/products?category=${category._id}`}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all ${
                  selectedCategory === category._id
                    ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                    : 'bg-cream-200 text-coffee-700 hover:bg-cream-300'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <p className="text-lg sm:text-xl md:text-2xl text-coffee-600">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to={`/products/${product._id}`}
                  className="bg-cream-50 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-coffee-100 block"
                >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 sm:h-48 md:h-56 object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-coffee-700 text-cream-50 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-base md:text-lg font-bold shadow-xl">
                    ${product.price}
                  </div>
                </div>
                <div className="p-3 sm:p-4 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-coffee-800">{product.name}</h3>
                  <p className="text-xs sm:text-sm text-coffee-600 line-clamp-2 mb-2 md:mb-3">{product.description}</p>
                  {product.stock === 0 && (
                    <p className="text-amber-600 text-xs sm:text-sm font-semibold">Out of Stock</p>
                  )}
                </div>
              </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Products;

