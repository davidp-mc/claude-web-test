import './PricingCard.css';

export function PricingCard({ plan, onSelectPlan }) {
  return (
    <div className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
      {plan.highlighted && <div className="popular-badge">Most Popular</div>}
      <h3 className="plan-name">{plan.name}</h3>
      <div className="price-container">
        <span className="currency">$</span>
        <span className="price">{plan.price}</span>
        <span className="interval">/{plan.interval}</span>
      </div>
      <ul className="features-list">
        {plan.features.map((feature, index) => (
          <li key={index} className="feature-item">
            <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        className="select-plan-btn"
        onClick={() => onSelectPlan(plan)}
      >
        Choose {plan.name}
      </button>
    </div>
  );
}
