import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import LoadingSpinner from '../LoadingSpinner';

const { FiCheck, FiStar, FiArrowRight, FiLock, FiCreditCard, FiShield, FiRefreshCw, FiZap, FiTrendingUp, FiUsers, FiBookOpen, FiVideo, FiHeadphones, FiTarget } = FiIcons;

const OptimizedPricingSection = ({ user, onAuthRequired }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const plan = {
    name: "Premium Business Transformation",
    originalPrice: 297,
    currentPrice: 97,
    savings: 200,
    priceId: "price_1RpeqPGz6CMM4O3dV93kJDsD",
    paymentLink: "https://buy.stripe.com/14A14n60Tf334UP9ihfUQ00",
    currency: "usd",
    interval: "month",
    description: "Everything you need to transform your business from a demanding job into a profitable, scalable asset",
    guarantee: "30-day money-back guarantee",
    features: [
      {
        icon: FiZap,
        title: "Unlimited AI Coaching",
        description: "24/7 access to Greg Head's AI-powered business advisor",
        category: "core"
      },
      {
        icon: FiTrendingUp,
        title: "Advanced Business Assessment",
        description: "300+ data point evaluation to identify profit leaks",
        category: "premium"
      },
      {
        icon: FiTarget,
        title: "Personalized Action Plans",
        description: "Custom roadmaps based on your specific challenges",
        category: "premium"
      },
      {
        icon: FiUsers,
        title: "Monthly Group Coaching",
        description: "Live sessions with Greg Head and peer business owners",
        category: "premium"
      },
      {
        icon: FiVideo,
        title: "Exclusive Video Library",
        description: "Complete training modules on the 12 Business Drivers",
        category: "premium"
      },
      {
        icon: FiBookOpen,
        title: "Implementation Guides",
        description: "Step-by-step playbooks for each business driver",
        category: "premium"
      },
      {
        icon: FiHeadphones,
        title: "Priority Support",
        description: "Direct access to our business coaching team",
        category: "premium"
      }
    ],
    testimonials: [
      {
        quote: "In 90 days, I increased my profit margin by 23% and reduced my working hours by 15 hours per week.",
        author: "Sarah Chen",
        business: "Digital Marketing Agency",
        result: "+23% profit margin"
      },
      {
        quote: "Finally understand what drives profit in my business. Greg's framework changed everything.",
        author: "Mike Thompson",
        business: "HVAC Business Owner",
        result: "$50K cash flow improvement"
      }
    ]
  };

  const handleUpgradeClick = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    setIsLoading(true);
    
    try {
      // Add small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Open Stripe payment link
      window.open(plan.paymentLink, '_blank');
      console.log("Opening payment link:", plan.paymentLink);
    } catch (error) {
      console.error("Error opening payment link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Proof Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center space-x-2 bg-success-100 text-success-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <SafeIcon icon={FiUsers} className="text-sm" />
            <span>Join 2,500+ business owners who've transformed their companies</span>
          </div>
        </motion.div>

        {/* Main Pricing Card */}
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl border-2 border-warning-200 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Popular Badge */}
          <div className="bg-gradient-to-r from-warning-500 to-warning-600 text-white text-center py-3">
            <div className="flex items-center justify-center space-x-2">
              <SafeIcon icon={FiStar} className="text-lg" />
              <span className="font-semibold">Most Popular Choice - Limited Time Offer</span>
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Pricing & CTA */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
                  {plan.name}
                </h2>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Pricing Display */}
                <div className="mb-8">
                  <div className="flex items-baseline space-x-3 mb-2">
                    <span className="text-2xl text-gray-500 line-through">
                      ${plan.originalPrice}
                    </span>
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.currentPrice}
                    </span>
                    <span className="text-lg text-gray-600">/{plan.interval}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="bg-danger-100 text-danger-700 px-3 py-1 rounded-full text-sm font-medium">
                      Save ${plan.savings}/month
                    </div>
                    <div className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium">
                      67% off regular price
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    That's less than $3.25 per day to transform your business
                  </p>
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={handleUpgradeClick}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-warning-500 to-warning-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-warning-600 hover:to-warning-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" color="white" />
                  ) : (
                    <>
                      <SafeIcon icon={FiCreditCard} className="text-xl" />
                      <span>Start Your Transformation Today</span>
                      <SafeIcon icon={FiArrowRight} className="text-xl" />
                    </>
                  )}
                </motion.button>

                {!user && (
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Sign in required to proceed with payment
                  </p>
                )}

                {/* Trust Signals */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiShield} className="text-success-500" />
                      <span>SSL Secured</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiLock} className="text-success-500" />
                      <span>256-bit Encryption</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiRefreshCw} className="text-success-500" />
                      <span>{plan.guarantee}</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Secure payment processing powered by Stripe
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Features */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading">
                  Everything You Get:
                </h3>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        feature.category === 'premium' 
                          ? 'bg-warning-100 text-warning-600' 
                          : 'bg-success-100 text-success-600'
                      }`}>
                        <SafeIcon icon={feature.icon} className="text-lg" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Value Proposition */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3">
                    💡 Compare to alternatives:
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Business consultant (1 hour)</span>
                      <span className="font-semibold">$300-500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">MBA business course</span>
                      <span className="font-semibold">$2,000+</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold text-warning-700">Greg Head's complete system</span>
                      <span className="font-bold text-warning-700">$97/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8 font-heading">
            Real Results from Business Owners Like You
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plan.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ y: -5 }}
              >
                <blockquote className="text-gray-700 mb-4 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.business}</p>
                  </div>
                  <div className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium">
                    {testimonial.result}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Toggle */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-2 mx-auto"
          >
            <span>{showDetails ? 'Hide' : 'Show'} Common Questions</span>
            <SafeIcon icon={FiArrowRight} className={`transition-transform ${showDetails ? 'rotate-90' : ''}`} />
          </button>
        </motion.div>

        {/* FAQ Section */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              className="mt-8 bg-white rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    How is this different from generic business advice?
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    This isn't theory - it's a proven framework from someone who's built, scaled, and sold dozens of businesses. Greg's walked your path.
                  </p>

                  <h4 className="font-semibold text-gray-900 mb-2">
                    Can I cancel anytime?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Yes, you can cancel your subscription at any time. No long-term contracts or cancellation fees.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    What if this doesn't work for my business?
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    We offer a 30-day money-back guarantee. If you don't see value in the first month, we'll refund your payment.
                  </p>

                  <h4 className="font-semibold text-gray-900 mb-2">
                    How quickly will I see results?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Most business owners identify 2-3 immediate profit leaks within the first week and see measurable improvements within 30 days.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final CTA */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 font-heading">
              Stop Being the Most Valuable Employee in Your Company
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Transform your business from a demanding job into a profitable, scalable asset. 
              Join thousands of business owners who've mastered the framework.
            </p>
            
            <motion.button
              onClick={handleUpgradeClick}
              disabled={isLoading}
              className="bg-warning-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-warning-600 disabled:opacity-50 transition-colors inline-flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" color="white" />
              ) : (
                <>
                  <span>Get Started Now - $97/month</span>
                  <SafeIcon icon={FiArrowRight} className="text-lg" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OptimizedPricingSection;