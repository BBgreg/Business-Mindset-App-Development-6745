import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiBrain, FiExternalLink } = FiIcons;

const Footer = () => {
  return (
    <motion.footer 
      className="bg-gray-900 text-white py-12 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiBrain} className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading">
                  Master Business Owner Mindset
                </h3>
                <p className="text-sm text-gray-400">with Greg Head</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Practical, battle-tested strategies for business owners who want to build 
              profitable, scalable businesses that don't depend on them.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center space-x-2">
                  <span>5 Business Owner Challenges</span>
                  <SafeIcon icon={FiExternalLink} className="text-xs" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center space-x-2">
                  <span>12 Business Drivers Framework</span>
                  <SafeIcon icon={FiExternalLink} className="text-xs" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center space-x-2">
                  <span>Growth & Profit Blueprint</span>
                  <SafeIcon icon={FiExternalLink} className="text-xs" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="text-gray-400 text-sm space-y-2">
              <p>Built for business owners who want practical solutions, not more theory.</p>
              <p className="flex items-center space-x-2">
                <span>Made with</span>
                <SafeIcon icon={FiHeart} className="text-red-500 text-sm" />
                <span>for entrepreneurs</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2026 Master Business Owner Mindset. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
