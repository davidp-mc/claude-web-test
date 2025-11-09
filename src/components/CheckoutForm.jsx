import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutForm.css';

export function CheckoutForm({ plan, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // In a real application, you would:
      // 1. Create a PaymentIntent on your backend
      // 2. Pass the client_secret to confirmCardPayment
      // For demo purposes, we'll simulate the process

      const cardElement = elements.getElement(CardElement);

      // Simulated payment processing
      // Replace this with actual Stripe API call to your backend
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: email,
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      // Simulate successful payment
      // In production, send paymentMethod.id to your backend
      console.log('Payment Method Created:', paymentMethod);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSucceeded(true);
      setProcessing(false);

      // Show success message and close after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (err) {
      setError('An unexpected error occurred.');
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="checkout-header">
          <h2>Complete Your Purchase</h2>
          <div className="selected-plan-info">
            <p className="plan-name">{plan.name} Plan</p>
            <p className="plan-price">${plan.price}/{plan.interval}</p>
          </div>
        </div>

        {succeeded ? (
          <div className="success-message">
            <svg className="success-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h3>Payment Successful!</h3>
            <p>Welcome to the {plan.name} plan!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Card Details</label>
              <div className="card-element-container">
                <CardElement options={cardElementOptions} />
              </div>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!stripe || processing}
              className="submit-btn"
            >
              {processing ? 'Processing...' : `Pay $${plan.price}`}
            </button>

            <p className="test-card-info">
              Test card: 4242 4242 4242 4242 | Any future date | Any CVC
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
