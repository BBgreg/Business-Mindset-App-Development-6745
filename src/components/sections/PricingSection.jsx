import React from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiCheck, FiStar, FiArrowRight} = FiIcons;

const PricingSection = ({user, onAuthRequired}) => {
  const pricingPlans = [
    {
      name: "97.00",
      amount: 97.00,
      priceId: "price_1RpeqPGz6CMM4O3dV93kJDsD",
      paymentLink: "https://buy.stripe.com/14A14n60Tf334UP9ihfUQ00",
      currency: "usd",
      interval: "month",
      description: "Complete business transformation toolkit",
      features: [
        "Unlimited AI conversations",
        "Conversation history & notes",
        "Advanced business assessment",
        "Personalized action plans",
        "Monthly group coaching calls",
        "Exclusive video library",
        "Direct access to Greg Head",
        "Priority support"
      ],
      popular: true
    }
  ];

  const handleUpgradeClick = (paymentLink) => {
    if (!user) {
      onAuthRequired();
      return;
    }
    
    // Open Stripe payment link in new tab
    window.open(paymentLink, '_blank');
  };

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
        >
          <div className="inline-flex items-center space-x-2 bg-warning-100 text-warning-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <SafeIcon icon={FiStar} className="text-sm" />
            <span>Premium Business Transformation</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            Accelerate Your Business Growth
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get the complete toolkit to transform your business from a demanding job into a profitable, scalable asset.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <div className="flex justify-center">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-warning-500 shadow-warning-100 relative max-w-md w-full"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.1 * index}}
              whileHover={{y: -5}}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-warning-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading">
                  Premium Plan
                </h3>
                <div className="flex items-baseline justify-center space-x-1 mb-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.amount}</span>
                  <span className="text-gray-600">/{plan.interval}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center space-x-3">
                    <SafeIcon icon={FiCheck} className="text-success-500 text-lg flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={() => handleUpgradeClick(plan.paymentLink)}
                className="w-full bg-warning-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-warning-600 transition-colors flex items-center justify-center space-x-2"
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
              >
                <span>Upgrade Now</span>
                <SafeIcon icon={FiArrowRight} className="text-lg" />
              </motion.button>

              {!user && (
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Sign in required to proceed with payment
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div 
          className="mt-12 text-center"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.4}}
        >
          <p className="text-sm text-gray-500 mb-4">
            Secure payment processing powered by Stripe
          </p>
          <div className="flex justify-center items-center space-x-6 text-gray-400">
            <span className="text-xs">🔒 SSL Encrypted</span>
            <span className="text-xs">💳 All Major Cards</span>
            <span className="text-xs">↩️ 30-Day Guarantee</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingSection;