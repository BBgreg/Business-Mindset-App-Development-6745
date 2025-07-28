import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import OptimizedPricingSection from './OptimizedPricingSection';
import CheckoutModal from '../checkout/CheckoutModal';

const { FiStar, FiCheck, FiX, FiArrowRight, FiLock, FiUnlock, FiTrendingUp, FiUsers, FiBookOpen, FiVideo, FiZap, FiTarget, FiHeadphones } = FiIcons;

const PremiumFeatures = ({ isPremiumUser, user, onGoPremium, onAuthRequired }) => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const features = [
    {
      icon: FiZap,
      title: "Unlimited AI Coaching",
      description: "24/7 access to Greg Head's AI-powered business advisor trained on his complete methodology",
      free: true,
      premium: true,
      highlight: "Always available"
    },
    {
      icon: FiTrendingUp,
      title: "Advanced Business Assessment",
      description: "Complete evaluation using Greg's 300+ data point framework to identify profit leaks and growth opportunities",
      free: false,
      premium: true,
      highlight: "300+ data points"
    },
    {
      icon: FiTarget,
      title: "Personalized Action Plans",
      description: "Custom roadmaps based on your specific business challenges with step-by-step implementation guides",
      free: false,
      premium: true,
      highlight: "Custom roadmaps"
    },
    {
      icon: FiUsers,
      title: "Monthly Group Coaching",
      description: "Live sessions with Greg Head and peer business owners tackling similar challenges",
      free: false,
      premium: true,
      highlight: "Live with Greg"
    },
    {
      icon: FiVideo,
      title: "Exclusive Video Library",
      description: "Access to Greg's complete training modules on the 12 Business Drivers and implementation strategies",
      free: false,
      premium: true,
      highlight: "Complete library"
    },
    {
      icon: FiBookOpen,
      title: "Implementation Playbooks",
      description: "Step-by-step guides for implementing each of the 12 Business Drivers in your specific industry",
      free: false,
      premium: true,
      highlight: "Industry-specific"
    },
    {
      icon: FiHeadphones,
      title: "Priority Support",
      description: "Direct access to our business coaching team for personalized guidance and troubleshooting",
      free: false,
      premium: true,
      highlight: "Direct access"
    }
  ];

  const handleUpgradeClick = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    setShowCheckoutModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center space-x-2 bg-warning-100 text-warning-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <SafeIcon icon={FiStar} className="text-sm" />
            <span>Premium Business Transformation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
            Accelerate Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warning-600 to-warning-800">
              Business Growth
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get the complete toolkit to transform your business from a demanding job into a profitable, scalable asset with direct access to Greg Head's proven methodologies.
          </p>
        </motion.div>

        {/* Premium vs Free Comparison */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-heading">
            What's Included
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">Features</h3>
                </div>
                <div className="p-6 text-center border-l border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Free</h3>
                  <p className="text-sm text-gray-600 mt-1">Basic access</p>
                </div>
                <div className="p-6 text-center border-l border-gray-200 bg-warning-50">
                  <h3 className="text-lg font-semibold text-warning-800">Premium</h3>
                  <p className="text-sm text-warning-600 mt-1">Complete transformation</p>
                </div>
              </div>

              {/* Features */}
              {features.map((feature, index) => (
                <div key={index} className="grid grid-cols-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <SafeIcon icon={feature.icon} className="text-primary-600 text-sm" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                        {feature.highlight && (
                          <div className="inline-block bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium mt-2">
                            {feature.highlight}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex items-center justify-center border-l border-gray-200">
                    {feature.free ? (
                      <SafeIcon icon={FiCheck} className="text-success-500 text-xl" />
                    ) : (
                      <SafeIcon icon={FiX} className="text-gray-300 text-xl" />
                    )}
                  </div>
                  
                  <div className="p-6 flex items-center justify-center border-l border-gray-200 bg-warning-50">
                    <SafeIcon icon={FiCheck} className="text-warning-600 text-xl" />
                  </div>
                </div>
              ))}

              {/* Pricing Row */}
              <div className="grid grid-cols-3 bg-gray-50">
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900">Investment</h4>
                </div>
                <div className="p-6 text-center border-l border-gray-200">
                  <span className="text-2xl font-bold text-gray-900">$0</span>
                  <p className="text-sm text-gray-600">Forever</p>
                </div>
                <div className="p-6 text-center border-l border-gray-200 bg-warning-50">
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-lg text-gray-500 line-through">$297</span>
                      <span className="text-2xl font-bold text-warning-800">$97</span>
                      <span className="text-sm text-gray-600">/month</span>
                    </div>
                    <div className="bg-danger-100 text-danger-700 px-2 py-1 rounded text-xs font-medium">
                      67% off - Limited time
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Row */}
              <div className="grid grid-cols-3">
                <div className="p-6"></div>
                <div className="p-6 border-l border-gray-200">
                  <button 
                    disabled
                    className="w-full bg-gray-100 text-gray-500 py-2 rounded-lg font-medium cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                </div>
                <div className="p-6 border-l border-gray-200 bg-warning-50">
                  {isPremiumUser ? (
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 bg-success-100 text-success-800 py-2 rounded-lg font-medium">
                        <SafeIcon icon={FiCheck} />
                        <span>Active</span>
                      </div>
                    </div>
                  ) : (
                    <motion.button
                      onClick={handleUpgradeClick}
                      className="w-full bg-warning-500 text-white py-2 rounded-lg font-medium hover:bg-warning-600 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Upgrade Now
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Pricing Section */}
        {!isPremiumUser && (
          <OptimizedPricingSection 
            user={user} 
            onAuthRequired={onAuthRequired}
          />
        )}

        {/* Access Status */}
        <motion.section 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className={`inline-flex items-center space-x-3 px-6 py-4 rounded-2xl text-lg font-medium ${
            isPremiumUser 
              ? 'bg-success-100 text-success-800' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            <SafeIcon icon={isPremiumUser ? FiUnlock : FiLock} className="text-xl" />
            <span>
              {isPremiumUser 
                ? 'You have Premium Access!' 
                : user 
                  ? 'Upgrade to unlock all features' 
                  : 'Sign in to access premium features'
              }
            </span>
          </div>
          {!user && (
            <p className="text-gray-600 mt-4">
              Create an account to start your business transformation journey
            </p>
          )}
        </motion.section>

        {/* Testimonial Section */}
        <motion.section 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white text-center">
            <blockquote className="text-2xl md:text-3xl font-bold mb-6 italic leading-relaxed">
              "For the first time, I understand the levers that actually drive profit in my business. Greg didn't give me theory; he gave me a blueprint that changed everything."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-warning-500 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">M</span>
              </div>
              <div className="text-left">
                <p className="font-semibold">Mike Thompson</p>
                <p className="text-gray-300 text-sm">HVAC Business Owner</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        user={user}
        onAuthRequired={onAuthRequired}
      />
    </div>
  );
};

export default PremiumFeatures;