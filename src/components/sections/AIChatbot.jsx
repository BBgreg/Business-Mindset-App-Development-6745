import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import LoadingSpinner from '../LoadingSpinner';

const { FiSend, FiBrain, FiUser, FiClock, FiMessageSquare, FiTrash2 } = FiIcons;

const AIChatbot = ({ user, chatHistory, onSendMessage, onClearHistory, onAuthRequired }) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    if (!user) {
      onAuthRequired();
      return;
    }

    const message = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    try {
      await onSendMessage(message);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your chat history? This action cannot be undone.')) {
      onClearHistory();
    }
  };

  const suggestedQuestions = [
    "How can I improve my cash flow?",
    "I'm working 70 hours a week and feel trapped in my business",
    "How do I know if my pricing is right?",
    "What should I focus on to grow my business?",
    "How can I reduce my business stress?"
  ];

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center space-x-3 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <SafeIcon icon={FiBrain} className="text-sm" />
            <span>AI-Powered Business Coaching</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            Get Insights from Greg Head's Framework
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ask questions about business challenges, cash flow, growth strategies, or the 12 Business Drivers. 
            Get practical, actionable advice in Greg's direct style.
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Chat Header */}
          {user && chatHistory.length > 0 && (
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMessageSquare} className="text-primary-500" />
                <span className="text-sm text-gray-600">
                  {chatHistory.length} messages
                </span>
              </div>
              <button
                onClick={handleClearHistory}
                className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                <SafeIcon icon={FiTrash2} className="text-sm" />
                <span>Clear History</span>
              </button>
            </div>
          )}

          {/* Messages Area */}
          <div className="h-96 md:h-[500px] overflow-y-auto p-6 space-y-6">
            {/* Initial AI Message */}
            {chatHistory.length === 0 && (
              <motion.div 
                className="flex justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex space-x-3 max-w-[80%]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-white flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={FiBrain} className="text-sm" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      Hey there! I'm your AI advisor trained on Greg Head's Master Business Owner Mindset framework. 
                      I've got decades of battle-tested strategies to help you build a profitable, scalable business that doesn't depend on you.

                      What's keeping you up at night as a business owner? Are you dealing with cash flow issues, 
                      feeling trapped in your business, or struggling to understand what's really driving your profits?

                      Ask me anything about the 5 Business Owner Challenges or the 12 Business Drivers - 
                      I'm here to give you practical, actionable insights in Greg's direct, no-nonsense style.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Chat Messages */}
            <AnimatePresence>
              {chatHistory.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className={`flex space-x-3 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white'
                    }`}>
                      <SafeIcon icon={message.type === 'user' ? FiUser : FiBrain} className="text-sm" />
                    </div>
                    
                    {/* Message Content */}
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user' 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <div className={`flex items-center space-x-1 mt-2 text-xs ${
                        message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        <SafeIcon icon={FiClock} className="text-xs" />
                        <span>{formatTime(message.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div 
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex space-x-3 max-w-[80%]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-white flex items-center justify-center">
                    <SafeIcon icon={FiBrain} className="text-sm" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <LoadingSpinner size="sm" color="primary" />
                      <span className="text-sm text-gray-600">Greg is thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {chatHistory.length === 0 && (
            <div className="border-t border-gray-200 p-4">
              <p className="text-sm text-gray-600 mb-3 font-medium">Try asking about:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setInputValue(question)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Greg about your business challenges..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  rows="2"
                  disabled={isLoading}
                />
              </div>
              <motion.button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-primary-500 text-white p-3 rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiSend} className="text-lg" />
              </motion.button>
            </div>
            
            {!user && (
              <p className="text-xs text-gray-500 mt-2">
                💡 Sign in to save your conversation history and access premium features
              </p>
            )}
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center space-x-3 mb-3">
              <SafeIcon icon={FiMessageSquare} className="text-primary-500 text-xl" />
              <h3 className="font-semibold text-gray-900">Ask Anything</h3>
            </div>
            <p className="text-sm text-gray-600">
              Get insights on the 5 Business Challenges, 12 Business Drivers, or any specific business issue you're facing.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center space-x-3 mb-3">
              <SafeIcon icon={FiBrain} className="text-success-500 text-xl" />
              <h3 className="font-semibold text-gray-900">Greg's Voice</h3>
            </div>
            <p className="text-sm text-gray-600">
              Trained on Greg Head's methodology for practical, battle-tested advice from someone who's walked your path.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center space-x-3 mb-3">
              <SafeIcon icon={FiClock} className="text-warning-500 text-xl" />
              <h3 className="font-semibold text-gray-900">Instant Insights</h3>
            </div>
            <p className="text-sm text-gray-600">
              Get immediate, actionable advice without waiting for appointments or lengthy consultations.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIChatbot;