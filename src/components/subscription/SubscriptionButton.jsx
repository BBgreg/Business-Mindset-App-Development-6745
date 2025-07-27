import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { supabaseService } from '../../services/supabaseService'
import LoadingSpinner from '../LoadingSpinner'

const { FiCreditCard, FiCheck } = FiIcons

const SubscriptionButton = ({ user, isPremium, onUpgrade }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpgrade = async () => {
    if (!user) {
      setError('Please sign in to upgrade')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const { sessionId, url } = await supabaseService.createCheckoutSession(user.id)
      
      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      setError(error.message || 'Failed to start checkout process')
    } finally {
      setIsLoading(false)
    }
  }

  if (isPremium) {
    return (
      <motion.button
        className="w-full bg-success-100 text-success-800 py-3 rounded-lg font-semibold cursor-default flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.02 }}
      >
        <SafeIcon icon={FiCheck} />
        <span>Premium Active</span>
      </motion.button>
    )
  }

  return (
    <div className="w-full">
      <motion.button
        onClick={handleUpgrade}
        disabled={isLoading}
        className="w-full bg-warning-500 text-white py-3 rounded-lg font-semibold hover:bg-warning-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <LoadingSpinner size="sm" color="white" />
        ) : (
          <>
            <SafeIcon icon={FiCreditCard} />
            <span>Upgrade to Premium</span>
          </>
        )}
      </motion.button>
      
      {error && (
        <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}

export default SubscriptionButton