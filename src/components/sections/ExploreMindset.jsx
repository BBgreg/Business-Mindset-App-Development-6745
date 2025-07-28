import React from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiAlertTriangle, FiTrendingUp, FiDollarSign, FiTarget, FiArrowRight, FiCheck} = FiIcons;

const ExploreMindset = ({knowledgeBase}) => {
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {staggerChildren: 0.1}}
  };

  const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
            Master the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
              Business Owner Mindset
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stop being the most valuable employee in your company and start being a true business owner.
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mindset and Blueprint that transforms struggling businesses into profitable growth engines, scalable assets.
          </p>
        </motion.div>

        {/* 5 Challenges Section */}
        <motion.section
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <div className="inline-flex items-center space-x-2 bg-warning-100 text-warning-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <SafeIcon icon={FiAlertTriangle} className="text-sm" />
              <span>Critical Business Owner Challenges</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
              The 5 Challenges Every Business Owner Faces
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The core issues keeping you trapped in your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {knowledgeBase.challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                variants={itemVariants}
                whileHover={{y: -5}}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-danger-500 to-danger-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {challenge.id}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 font-heading">
                    {challenge.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {challenge.description}
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {challenge.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Areas Include */}
          <motion.div className="mt-12 text-center" variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading">
              Key Areas Include:
            </h3>
            <ul className="text-left max-w-3xl mx-auto space-y-3 text-lg text-gray-700">
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiCheck} className="text-success-500 text-xl mt-1 flex-shrink-0" />
                <span>Business Owner Dependency: Your business relies heavily on you, the owner.</span>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiCheck} className="text-success-500 text-xl mt-1 flex-shrink-0" />
                <span>Catch-22 Situation for Growth: Stuck needing cash to grow, but can't grow without cash.</span>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiCheck} className="text-success-500 text-xl mt-1 flex-shrink-0" />
                <span>Lacks a simple way to understand what's working and what's not working in their business.</span>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiCheck} className="text-success-500 text-xl mt-1 flex-shrink-0" />
                <span>Fear of Failing: Failure-Proof Your Mindset and unfreeze your business.</span>
              </li>
              <li className="flex items-start space-x-3">
                <SafeIcon icon={FiCheck} className="text-success-500 text-xl mt-1 flex-shrink-0" />
                <span>Lack of Success: Know what to do to get out of survival mode to have a growing and successful business.</span>
              </li>
            </ul>
          </motion.div>
        </motion.section>

        {/* 12 Business Drivers Section */}
        <motion.section
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <div className="inline-flex items-center space-x-2 bg-success-100 text-success-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <SafeIcon icon={FiTrendingUp} className="text-sm" />
              <span>The Solution Framework</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
              The 12 Business Drivers That Actually Matter
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The operational and financial levers that transform your business from a demanding job into a growth machine.
            </p>
          </motion.div>

          {/* Revenue Drivers */}
          <motion.div className="mb-12" variants={itemVariants}>
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <SafeIcon icon={FiTrendingUp} className="text-2xl" />
                <h3 className="text-2xl font-bold font-heading">Revenue Drivers</h3>
              </div>
              <p className="text-primary-100 text-lg">
                The fundamental levers that determine how much money comes into your business.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {knowledgeBase.businessDrivers.revenue.map((driver, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                  whileHover={{scale: 1.02}}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 font-heading">
                    {driver.name}
                  </h4>
                  <p className="text-gray-600 mb-4">{driver.description}</p>
                  <div className="space-y-2">
                    {driver.keyQuestions.map((question, qIndex) => (
                      <div key={qIndex} className="flex items-start space-x-2">
                        <SafeIcon icon={FiArrowRight} className="text-primary-500 text-sm mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{question}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Profit Drivers */}
          <motion.div className="mb-12" variants={itemVariants}>
            <div className="bg-gradient-to-r from-success-500 to-success-600 rounded-2xl p-8 text-white mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <SafeIcon icon={FiDollarSign} className="text-2xl" />
                <h3 className="text-2xl font-bold font-heading">Profit Drivers</h3>
              </div>
              <p className="text-success-100 text-lg">
                Drivers and Levers that directly impact how much money you make.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {knowledgeBase.businessDrivers.profit.map((driver, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                  whileHover={{scale: 1.02}}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 font-heading">
                    {driver.name}
                  </h4>
                  <p className="text-gray-600 mb-4">{driver.description}</p>
                  <div className="space-y-2">
                    {driver.keyQuestions.map((question, qIndex) => (
                      <div key={qIndex} className="flex items-start space-x-2">
                        <SafeIcon icon={FiArrowRight} className="text-success-500 text-sm mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{question}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cash Flow Drivers */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-r from-warning-500 to-warning-600 rounded-2xl p-8 text-white mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <SafeIcon icon={FiTarget} className="text-2xl" />
                <h3 className="text-2xl font-bold font-heading">Cash Flow Drivers</h3>
              </div>
              <p className="text-warning-100 text-lg">
                Cash is NOT King... Cash Flow is King! These drivers determine your ability to grow and thrive.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {knowledgeBase.businessDrivers.cashFlow.map((driver, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                  whileHover={{scale: 1.02}}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 font-heading">
                    {driver.name}
                  </h4>
                  <p className="text-gray-600 mb-4">{driver.description}</p>
                  <div className="space-y-2">
                    {driver.keyQuestions.slice(0, 2).map((question, qIndex) => (
                      <div key={qIndex} className="flex items-start space-x-2">
                        <SafeIcon icon={FiArrowRight} className="text-warning-500 text-sm mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{question}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Key Insights Section */}
        <motion.section
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
              Greg Head's Key Insights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Battle-tested wisdom from someone who's walked the same path and built profitable, scalable businesses.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {knowledgeBase.keyInsights.map((insight, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white"
                variants={itemVariants}
                whileHover={{scale: 1.02}}
              >
                <h3 className="text-xl font-bold mb-4 text-primary-300 font-heading">
                  {insight.title}
                </h3>
                <blockquote className="text-lg italic mb-4 leading-relaxed">
                  "{insight.quote}"
                </blockquote>
                <p className="text-gray-300 text-sm">
                  {insight.context}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="text-center mb-16"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.8}}
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
              Ready to Master Your Business?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Get personalized insights and actionable advice using our AI-powered coaching system trained on Greg Head's proven methodologies.
            </p>
            <motion.button
              className="bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors inline-flex items-center space-x-2"
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-chatbot'))}
            >
              <span>Get AI Insights Now</span>
              <SafeIcon icon={FiArrowRight} className="text-lg" />
            </motion.button>
          </div>
        </motion.section>

        {/* Concluding Statement */}
        <motion.div
          className="text-center mb-8"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 1.0}}
        >
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            The Blueprint to have what you always wanted, more money and more time with the family.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ExploreMindset;