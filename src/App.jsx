import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PlansProvider } from './context/PlansContext';
import { PricingPlans } from './components/PricingPlans';
import { AdminPanel } from './components/AdminPanel';
import './App.css';

// Replace with your actual Stripe publishable key
// Get your test key from: https://dashboard.stripe.com/test/apikeys
const stripePromise = loadStripe('pk_test_51234567890abcdefghijklmnopqrstuvwxyz');

function App() {
  return (
    <PlansProvider>
      <Elements stripe={stripePromise}>
        <div className="app">
          <PricingPlans />
          <AdminPanel />
        </div>
      </Elements>
    </PlansProvider>
  );
}

export default App;
