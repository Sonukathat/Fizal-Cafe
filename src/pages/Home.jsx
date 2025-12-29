import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { productsAPI, categoriesAPI } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll()
      ]);
      setProducts(productsRes.data.slice(0, 8)); // Show first 8 products
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-900 text-white pt-20">
        {/* Background accents */}
        <div className="absolute inset-0">
          <div className="absolute -left-10 -top-10 w-64 h-64 md:w-96 md:h-96 bg-amber-200/20 blur-3xl rounded-full" />
          <div className="absolute -right-10 top-10 w-64 h-64 md:w-96 md:h-96 bg-cream-200/10 blur-3xl rounded-full" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_40%)]" />
        </div>

        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-20 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-14 items-center">
            {/* Text column */}
            <div className="text-center lg:text-left space-y-5 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm md:text-base shadow-lg backdrop-blur"
              >
                <span className="text-amber-300">New</span>
                <span>Signature brews & cozy events</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-r from-cream-50 via-cream-100 to-amber-200 bg-clip-text text-transparent px-2 sm:px-0"
              >
                Craft Coffee,
                <br className="hidden sm:block" /> Cozy Moments.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-cream-100/90 max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0"
              >
                Freshly roasted beans, artisan pastries, and a warm space for your daily ritual or your next celebration.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4"
              >
                <Link
                  to="/products"
                  className="bg-cream-50 text-coffee-900 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg shadow-2xl hover:shadow-coffee-900/40 hover:scale-105 transition-all"
                >
                  Explore Menu
                </Link>
                <Link
                  to="/book-event"
                  className="bg-transparent border border-cream-200/60 text-cream-50 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-cream-50/10 hover:border-cream-50 transition-all"
                >
                  Book an Event
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-3 md:gap-4 max-w-xl mx-auto lg:mx-0 pt-4 md:pt-6"
              >
                {[
                  { label: 'Signature brews', value: '40+' },
                  { label: 'Customer rating', value: '4.9★' },
                  { label: 'Event capacity', value: '100+' }
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 border border-white/10 rounded-2xl px-3 py-3 md:px-4 md:py-4 text-left shadow-lg backdrop-blur"
                  >
                    <p className="text-cream-200 text-xs md:text-sm">{stat.label}</p>
                    <p className="text-cream-50 text-lg md:text-2xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visual column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"
                  alt="Coffee shop"
                  className="w-full h-72 md:h-[430px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/60 via-coffee-900/20 to-transparent" />
              </div>
              <div className="absolute -left-6 -bottom-6 bg-cream-50 text-coffee-900 rounded-2xl shadow-2xl px-4 py-3 md:px-6 md:py-4 flex items-center gap-3 border border-coffee-100">
                <div className="text-2xl">🫘</div>
                <div>
                  <p className="text-sm text-coffee-700">Freshly Roasted</p>
                  <p className="font-bold text-coffee-900">Daily batches</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-cream-50 to-white">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 md:mb-4 text-coffee-800"
          >
            Shop by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-coffee-600 mb-8 md:mb-12 text-base md:text-lg px-2"
          >
            Discover our curated collections
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to={`/products?category=${category._id}`}
                  className="bg-gradient-to-br from-cream-100 to-cream-200 p-4 md:p-8 rounded-xl md:rounded-2xl text-center hover:from-coffee-100 hover:to-coffee-200 transition-all shadow-lg hover:shadow-xl border border-coffee-200 block"
                >
                  <h3 className="text-sm sm:text-base md:text-xl font-bold text-coffee-800">{category.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8 sm:py-12 md:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 md:mb-4 text-coffee-800"
          >
            Featured Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-coffee-600 mb-8 md:mb-12 text-base md:text-lg px-2"
          >
            Handpicked favorites just for you
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to={`/products/${product._id}`}
                  className="bg-cream-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-coffee-100 block"
                >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-coffee-700 text-cream-50 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold shadow-lg">
                    ${product.price}
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-xl font-bold mb-2 text-coffee-800">{product.name}</h3>
                  <p className="text-xs md:text-sm text-coffee-600 line-clamp-2">{product.description}</p>
                </div>
              </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-8 md:mt-12"
          >
            <Link
              to="/products"
              className="bg-gradient-to-r from-coffee-600 to-coffee-700 text-white px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-base md:text-lg hover:from-coffee-700 hover:to-coffee-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-block"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-coffee-50 to-cream-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-coffee-800">About Fizal Cafe</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-coffee-700 text-base md:text-lg mb-4 md:mb-6 leading-relaxed px-2">
              Fizal Cafe is your premium destination for the finest coffee and cafe products. 
              We source only the highest quality beans and ingredients to bring you an exceptional experience.
            </p>
            <p className="text-coffee-700 text-base md:text-lg leading-relaxed px-2">
              From artisanal coffee blends to delicious pastries, every item is carefully selected 
              to ensure you enjoy the perfect cup every time.
            </p>
          </div>
        </div>
      </section>

      {/* Event Booking Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 md:py-20 bg-gradient-to-br from-coffee-50 via-cream-100 to-coffee-100 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 text-8xl">🎉</div>
          <div className="absolute bottom-10 left-10 text-7xl">🎂</div>
          <div className="absolute top-1/2 right-1/4 text-6xl">🎈</div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-coffee-800 px-2">
                Host Your Special Events With Us
              </h2>
              <p className="text-base md:text-xl text-coffee-700 mb-2 px-2">Perfect venue for birthdays, anniversaries, and celebrations</p>
              <p className="text-sm md:text-lg text-coffee-600 px-2">Book our party ground and make your event unforgettable!</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
              {[
                {
                  title: 'Birthday Parties',
                  desc: 'Celebrate your special day with delicious food and great ambiance',
                  img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Corporate Events',
                  desc: 'Professional space for meetings, seminars, and team building',
                  img: 'https://images.unsplash.com/photo-1556767576-5ec41e3239af?auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Party Ground & Hall',
                  desc: 'Spacious indoor/outdoor area for up to 100 guests with decor',
                  img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -6 }}
                  className="bg-cream-50 rounded-xl md:rounded-2xl shadow-xl border-2 border-coffee-200 overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="relative h-44 md:h-52 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/50 to-transparent" />
                  </div>
                  <div className="p-5 md:p-6 text-center space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold text-coffee-800">{item.title}</h3>
                    <p className="text-sm md:text-base text-coffee-700">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-coffee-700 to-coffee-800 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center shadow-2xl">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-cream-50 mb-3 md:mb-4">Ready to Book Your Event?</h3>
              <p className="text-cream-200 text-sm md:text-lg mb-6 md:mb-8 px-2">
                Our spacious party ground can accommodate up to 100 guests. 
                We provide catering, decorations, and all the amenities you need for a perfect celebration.
              </p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
                <div className="bg-cream-50/20 rounded-lg md:rounded-xl px-4 py-2 md:px-6 md:py-3">
                  <p className="text-cream-50 font-semibold text-xs md:text-sm">📅 Flexible Dates</p>
                </div>
                <div className="bg-cream-50/20 rounded-lg md:rounded-xl px-4 py-2 md:px-6 md:py-3">
                  <p className="text-cream-50 font-semibold text-xs md:text-sm">🍰 Custom Catering</p>
                </div>
                <div className="bg-cream-50/20 rounded-lg md:rounded-xl px-4 py-2 md:px-6 md:py-3">
                  <p className="text-cream-50 font-semibold text-xs md:text-sm">🎨 Decorations</p>
                </div>
                <div className="bg-cream-50/20 rounded-lg md:rounded-xl px-4 py-2 md:px-6 md:py-3">
                  <p className="text-cream-50 font-semibold text-xs md:text-sm">🎵 Sound System</p>
                </div>
              </div>
              <Link
                to="/book-event"
                className="bg-cream-50 text-coffee-800 px-6 py-3 md:px-12 md:py-4 rounded-full font-bold text-base md:text-xl hover:bg-cream-100 transition-all shadow-2xl hover:shadow-coffee-900/50 hover:scale-105 inline-block"
              >
                Book Now 🎉
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 md:py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4 text-coffee-800">What Our Customers Say</h2>
          <p className="text-center text-coffee-600 mb-8 md:mb-12 text-base md:text-lg px-2">Join thousands of satisfied coffee lovers</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                stars: "⭐⭐⭐⭐⭐",
                text: "The best coffee I've ever had! Fizal Cafe's selection is incredible and the delivery was super fast.",
                author: "Sarah Johnson"
              },
              {
                stars: "⭐⭐⭐⭐⭐",
                text: "Amazing quality and excellent customer service. Fizal Cafe has become my go-to for all coffee needs!",
                author: "Michael Chen"
              },
              {
                stars: "⭐⭐⭐⭐⭐",
                text: "Perfect blend of quality and convenience. The website is beautiful and easy to use!",
                author: "Emily Davis"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-cream-50 to-cream-100 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-xl border border-coffee-200 hover:shadow-2xl transition-all"
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{testimonial.stars}</div>
                <p className="text-coffee-700 mb-4 md:mb-6 text-base md:text-lg leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <p className="font-bold text-coffee-800 text-sm md:text-base">- {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-coffee-900 to-coffee-800 text-cream-50 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-cream-100 to-cream-200 bg-clip-text text-transparent">FC</h3>
              <p className="text-cream-200 leading-relaxed text-sm md:text-base">
                Your premium destination for the finest coffee and cafe experience. 
                Quality you can taste, service you can trust.
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-cream-100">Quick Links</h4>
              <ul className="space-y-2 md:space-y-3">
                <li><Link to="/" className="text-cream-200 hover:text-cream-50 transition-colors text-sm md:text-base">Home</Link></li>
                <li><Link to="/products" className="text-cream-200 hover:text-cream-50 transition-colors text-sm md:text-base">Products</Link></li>
                <li><Link to="/book-event" className="text-cream-200 hover:text-cream-50 transition-colors text-sm md:text-base">Book Event</Link></li>
                <li><Link to="/cart" className="text-cream-200 hover:text-cream-50 transition-colors text-sm md:text-base">Cart</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-cream-100">Contact</h4>
              <p className="text-cream-200 mb-2 text-sm md:text-base">📧 Email: support@fizalcafe.com</p>
              <p className="text-cream-200 text-sm md:text-base">📞 Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-coffee-700 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-cream-300 text-sm md:text-base">
            <p>&copy; 2024 Fizal Cafe. All rights reserved. Made with ☕ and ❤️</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;

