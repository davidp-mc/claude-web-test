import { useState } from 'react';
import { usePlans } from '../context/PlansContext';
import './AdminPanel.css';

export function AdminPanel() {
  const { plans, updatePlan, addPlan, deletePlan, resetPlans } = usePlans();
  const [isOpen, setIsOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    interval: 'month',
    features: '',
    highlighted: false,
    stripePriceId: ''
  });

  const handleEdit = (plan) => {
    setEditingPlan(plan.id);
    setFormData({
      name: plan.name,
      price: plan.price,
      interval: plan.interval,
      features: plan.features.join('\n'),
      highlighted: plan.highlighted,
      stripePriceId: plan.stripePriceId
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const planData = {
      name: formData.name,
      price: parseFloat(formData.price),
      interval: formData.interval,
      features: formData.features.split('\n').filter(f => f.trim()),
      highlighted: formData.highlighted,
      stripePriceId: formData.stripePriceId
    };

    if (editingPlan) {
      updatePlan(editingPlan, planData);
    } else {
      addPlan(planData);
    }

    resetForm();
  };

  const resetForm = () => {
    setEditingPlan(null);
    setFormData({
      name: '',
      price: '',
      interval: 'month',
      features: '',
      highlighted: false,
      stripePriceId: ''
    });
  };

  const handleDelete = (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      deletePlan(planId);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all plans to default?')) {
      resetPlans();
      resetForm();
    }
  };

  return (
    <div className="admin-panel">
      <button
        className="admin-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕ Close Admin' : '⚙️ Admin Panel'}
      </button>

      {isOpen && (
        <div className="admin-content">
          <div className="admin-header">
            <h2>Manage Subscription Plans</h2>
            <button className="reset-btn" onClick={handleReset}>
              Reset to Default
            </button>
          </div>

          <div className="admin-grid">
            <div className="plans-list">
              <h3>Current Plans</h3>
              {plans.map((plan) => (
                <div key={plan.id} className="plan-item">
                  <div className="plan-item-header">
                    <h4>{plan.name}</h4>
                    <span className="plan-price">${plan.price}/{plan.interval}</span>
                  </div>
                  <div className="plan-item-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(plan)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(plan.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="plan-form-container">
              <h3>{editingPlan ? 'Edit Plan' : 'Add New Plan'}</h3>
              <form onSubmit={handleSubmit} className="plan-form">
                <div className="form-row">
                  <div className="form-field">
                    <label>Plan Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Interval</label>
                    <select
                      value={formData.interval}
                      onChange={(e) => setFormData({ ...formData, interval: e.target.value })}
                    >
                      <option value="month">Month</option>
                      <option value="year">Year</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Stripe Price ID</label>
                    <input
                      type="text"
                      value={formData.stripePriceId}
                      onChange={(e) => setFormData({ ...formData, stripePriceId: e.target.value })}
                      placeholder="price_xxxxx"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Features (one per line)</label>
                  <textarea
                    rows="5"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    required
                  />
                </div>

                <div className="form-field checkbox-field">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.highlighted}
                      onChange={(e) => setFormData({ ...formData, highlighted: e.target.checked })}
                    />
                    Highlight this plan (Most Popular)
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    {editingPlan ? 'Update Plan' : 'Add Plan'}
                  </button>
                  {editingPlan && (
                    <button type="button" className="cancel-btn" onClick={resetForm}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
