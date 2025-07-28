import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiMenu, FiX, FiBrain, FiTrendingUp, FiStar } = FiIcons;

const Header = ({ 
  activeSection, 
  setActiveSection, 
  user, 
  isPremiumUser, 
  onAuthAction,
  isMobileMenuOpen,
  setIsMobileMenuOpen 
}) => {
  const navigationItems = [
    { id: 'explore', label: 'Explore Mindset', icon: FiBrain },
    { id: 'chatbot', label: 'AI Insights', icon: FiTrendingUp },
    { id: 'premium', label: 'Premium Features', icon: FiStar }
  ];

  return (
    <motion.header 
      className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setActiveSection('explore')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiBrain} className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-heading">
                Master Business Owner Mindset
              </h2>
               <h2 className="text-xl font-bold text-gray-900 font-heading">
                with the Growth & Profit Blueprint
              </h2>
              <p className="text-xs text-gray-500">Powered by Greg Head</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeSection === item.id
                    ? 'bg-primary-100 text-primary-700 shadow-sm'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SafeIcon icon={item.icon} className="text-sm" />
                <span className="text-sm">{item.label}</span>
                {item.id === 'premium' && isPremiumUser && (
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                )}
              </motion.button>
            ))}
          </nav>

          {/* User Profile & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* User Profile */}
            {user ? (
              <motion.div 
                className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiUser} className="text-white text-sm" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user.displayName || user.email}
                  </p>
                  {isPremiumUser && (
                    <p className="text-xs text-success-600 font-medium">Premium</p>
                  )}
                </div>
                <button
                  onClick={onAuthAction}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Sign Out
                </button>
              </motion.div>
            ) : (
              <motion.button
                onClick={onAuthAction}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <SafeIcon 
                icon={isMobileMenuOpen ? FiX : FiMenu} 
                className="text-xl" 
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden border-t border-gray-200 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-3 ${
                    activeSection === item.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <SafeIcon icon={item.icon} className="text-lg" />
                  <span>{item.label}</span>
                  {item.id === 'premium' && isPremiumUser && (
                    <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  )}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
