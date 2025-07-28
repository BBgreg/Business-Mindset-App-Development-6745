import React from 'react';
import OptimizedPricingSection from './OptimizedPricingSection';

const PricingSection = ({ user, onAuthRequired }) => {
  return (
    <OptimizedPricingSection 
      user={user} 
      onAuthRequired={onAuthRequired} 
    />
  );
};

export default PricingSection;