import React, {useState} from 'react'
import {motion} from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import LoadingSpinner from '../LoadingSpinner'

const {FiCreditCard, FiCheck, FiExternalLink} = FiIcons

const SubscriptionButton = ({user, isPremium, onUpgrade, paymentLink}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    if (!user) {
      onUpgrade()
      return
    }

    setIsLoading(true)
    
    try {
      // Open Stripe payment link in new tab
      if (paymentLink) {
        window.open(paymentLink, '_blank')
      } else {
        // Fallback to existing upgrade flow
        onUpgrade()
      }
    } catch (error) {
      console.error('Error opening payment link:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isPremium) {
    return (
      <motion.button
        className="w-full bg-success-100 text-success-800 py-3 rounded-lg font-semibold cursor-default flex items-center justify-center space-x-2"
        whileHover={{scale: 1.02}}
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
        whileHover={{scale: 1.02}}
        whileTap={{scale: 0.98}}
      >
        {isLoading ? (
          <LoadingSpinner size="sm" color="white" />
        ) : (
          <>
            <SafeIcon icon={paymentLink ? FiExternalLink : FiCreditCard} />
            <span>Upgrade to Premium</span>
          </>
        )}
      </motion.button>
    </div>
  )
}

export default SubscriptionButton