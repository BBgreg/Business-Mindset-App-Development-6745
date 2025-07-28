import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import LoadingSpinner from '../LoadingSpinner';

const { FiX, FiShield, FiCreditCard, FiLock, FiCheck, FiArrowRight, FiStar } = FiIcons;

const CheckoutModal = ({ isOpen, onClose, user, onAuthRequired }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: confirmation, 2: processing, 3: success

  const plan = {
    name: "Premium Business Transformation",
    price: 97,
    originalPrice: 297,
    paymentLink: "https://buy.stripe.com/14A14n60Tf334UP9ihfUQ00"
  };

  const handleProceedToPayment = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    setStep(2);
    setIsProcessing(true);

    try {
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Open Stripe checkout
      window.open(plan.paymentLink, '_blank');
      
      // Show success state
      setStep(3);
    } catch (error) {
      console.error("Error opening payment link:", error);
      setStep(1);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      setStep(1);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Step 1: Confirmation */}
          {step === 1 && (
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading">
                    Confirm Your Order
                  </h2>
                  <p className="text-gray-600 mt-1">
                    You're one step away from transforming your business
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiX} className="text-gray-500 text-xl" />
                </button>
              </div>

              {/* Plan Summary */}
              <div className="bg-gradient-to-r from-warning-50 to-warning-100 rounded-xl p-6 mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <SafeIcon icon={FiStar} className="text-warning-600" />
                  <span className="text-warning-800 font-medium text-sm">Premium Plan</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                
                <div className="flex items-baseline space-x-3 mb-4">
                  <span className="text-lg text-gray-500 line-through">
                    ${plan.originalPrice}
                  </span>
                  <span className="text-3xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>

                <div className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                  Save $200/month (67% off)
                </div>
              </div>

              {/* Key Benefits */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  What you get today:
                </h4>
                <div className="space-y-2">
                  {[
                    "Unlimited AI coaching with Greg Head's framework",
                    "Advanced business assessment & profit leak identification",
                    "Monthly live group coaching sessions",
                    "Complete video library & implementation guides"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <SafeIcon icon={FiCheck} className="text-success-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Signals */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <SafeIcon icon={FiShield} className="text-success-500 text-lg mx-auto mb-1" />
                    <p className="text-xs text-gray-600">SSL Secured</p>
                  </div>
                  <div>
                    <SafeIcon icon={FiLock} className="text-success-500 text-lg mx-auto mb-1" />
                    <p className="text-xs text-gray-600">256-bit Encryption</p>
                  </div>
                  <div>
                    <SafeIcon icon={FiCreditCard} className="text-success-500 text-lg mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Stripe Secure</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={handleProceedToPayment}
                className="w-full bg-gradient-to-r from-warning-500 to-warning-600 text-white py-4 rounded-xl font-bold text-lg hover:from-warning-600 hover:to-warning-700 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SafeIcon icon={FiCreditCard} />
                <span>Proceed to Secure Payment</span>
                <SafeIcon icon={FiArrowRight} />
              </motion.button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                30-day money-back guarantee • Cancel anytime
              </p>
            </div>
          )}

          {/* Step 2: Processing */}
          {step === 2 && (
            <div className="p-8 text-center">
              <div className="mb-6">
                <LoadingSpinner size="xl" color="primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">
                Opening Secure Checkout...
              </h2>
              <p className="text-gray-600">
                You'll be redirected to our secure payment processor
              </p>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiCheck} className="text-success-500 text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">
                Payment Window Opened!
              </h2>
              <p className="text-gray-600 mb-6">
                Complete your purchase in the new window to start your business transformation.
              </p>
              <button
                onClick={handleClose}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Continue Exploring
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutModal;