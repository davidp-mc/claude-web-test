import { createContext, useContext, useState } from 'react';

const PlansContext = createContext();

const defaultPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    interval: 'month',
    features: [
      '10 Projects',
      '5GB Storage',
      'Email Support',
      'Basic Analytics'
    ],
    highlighted: false,
    stripePriceId: 'price_basic' // Replace with actual Stripe Price ID
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29.99,
    interval: 'month',
    features: [
      'Unlimited Projects',
      '100GB Storage',
      'Priority Support',
      'Advanced Analytics',
      'Custom Domains',
      'Team Collaboration'
    ],
    highlighted: true,
    stripePriceId: 'price_pro' // Replace with actual Stripe Price ID
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99.99,
    interval: 'month',
    features: [
      'Everything in Pro',
      'Unlimited Storage',
      '24/7 Phone Support',
      'Dedicated Account Manager',
      'Custom Integrations',
      'SLA Guarantee'
    ],
    highlighted: false,
    stripePriceId: 'price_enterprise' // Replace with actual Stripe Price ID
  }
];

export function PlansProvider({ children }) {
  const [plans, setPlans] = useState(() => {
    const savedPlans = localStorage.getItem('subscriptionPlans');
    return savedPlans ? JSON.parse(savedPlans) : defaultPlans;
  });

  const updatePlan = (planId, updatedData) => {
    setPlans(prevPlans => {
      const newPlans = prevPlans.map(plan =>
        plan.id === planId ? { ...plan, ...updatedData } : plan
      );
      localStorage.setItem('subscriptionPlans', JSON.stringify(newPlans));
      return newPlans;
    });
  };

  const addPlan = (newPlan) => {
    setPlans(prevPlans => {
      const newPlans = [...prevPlans, { ...newPlan, id: Date.now().toString() }];
      localStorage.setItem('subscriptionPlans', JSON.stringify(newPlans));
      return newPlans;
    });
  };

  const deletePlan = (planId) => {
    setPlans(prevPlans => {
      const newPlans = prevPlans.filter(plan => plan.id !== planId);
      localStorage.setItem('subscriptionPlans', JSON.stringify(newPlans));
      return newPlans;
    });
  };

  const resetPlans = () => {
    setPlans(defaultPlans);
    localStorage.setItem('subscriptionPlans', JSON.stringify(defaultPlans));
  };

  return (
    <PlansContext.Provider value={{ plans, updatePlan, addPlan, deletePlan, resetPlans }}>
      {children}
    </PlansContext.Provider>
  );
}

export function usePlans() {
  const context = useContext(PlansContext);
  if (!context) {
    throw new Error('usePlans must be used within a PlansProvider');
  }
  return context;
}
