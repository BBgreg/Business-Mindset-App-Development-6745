import React from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import PricingSection from './PricingSection';

const {FiStar, FiCheck, FiX, FiArrowRight, FiLock, FiUnlock, FiTrendingUp, FiUsers, FiBookOpen, FiVideo} = FiIcons;

const PremiumFeatures = ({isPremiumUser, user, onGoPremium, onAuthRequired}) => {
  const features = [
    {
      icon: FiTrendingUp,
      title: "Advanced Business Assessment",
      description: "Complete evaluation using Greg's 300+ data point framework to identify profit leaks and growth opportunities",
      free: false,
      premium: true
    },
    {
      icon: FiBookOpen,
      title: "Personalized Action Plans",
      description: "Custom roadmaps based on your specific business challenges with step-by-step implementation guides",
      free: false,
      premium: true
    },
    {
      icon: FiUsers,
      title: "Monthly Group Coaching",
      description: "Live sessions with Greg Head and peer business owners tackling similar challenges",
      free: false,
      premium: true
    },
    {
      icon: FiVideo,
      title: "Exclusive Video Library",
      description: "Access to Greg's complete training modules on the 12 Business Drivers and implementation strategies",
      free: false,
      premium: true
    }
  ];

  const handleUpgradeClick = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    onGoPremium();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
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

        {/* Premium Features Grid */}
        <motion.section 
          className="mb-20"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.2}}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-heading">
            What You Get with Premium
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.1 * index}}
                whileHover={{y: -5}}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-warning-500 to-warning-600 rounded-xl flex items-center justify-center">
                    <SafeIcon icon={feature.icon} className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 font-heading">
                      {feature.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <SafeIcon icon={FiStar} className="text-warning-500 text-sm" />
                      <span className="text-sm text-warning-600 font-medium">Premium Only</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pricing Section */}
        <PricingSection 
          user={user}
          onAuthRequired={onAuthRequired}
        />

        {/* Access Status */}
        <motion.section 
          className="text-center mt-16"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.6}}
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
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.8}}
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
    </div>
  );
};

export default PremiumFeatures;