import { useState } from 'react';
import { PricingCard } from './PricingCard';
import { CheckoutForm } from './CheckoutForm';
import { usePlans } from '../context/PlansContext';
import './PricingPlans.css';

export function PricingPlans() {
  const { plans } = usePlans();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedPlan(null);
  };

  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h1 className="pricing-title">Choose Your Plan</h1>
        <p className="pricing-subtitle">
          Select the perfect plan for your needs. Upgrade or downgrade at any time.
        </p>
      </div>
      <div className="pricing-grid">
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            onSelectPlan={handleSelectPlan}
          />
        ))}
      </div>
      {showCheckout && selectedPlan && (
        <CheckoutForm
          plan={selectedPlan}
          onClose={handleCloseCheckout}
        />
      )}
    </div>
  );
}
