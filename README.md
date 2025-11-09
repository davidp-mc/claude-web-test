# Subscription Plans & Payment Page

A modern, responsive React web application for displaying subscription plans with dynamic content management and integrated payment processing via Stripe.

## Features

- **Beautiful Subscription Plans Display**: Three-tier pricing layout with customizable plans
- **Dynamic Content Management**: Built-in admin panel to update plans in real-time
- **Payment Integration**: Stripe payment processing for secure transactions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Persistent Storage**: Plan configurations saved to localStorage
- **Real-time Updates**: Changes to plans reflect immediately without page refresh

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Stripe account (for payment processing)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Update the Stripe publishable key in `src/App.jsx`:

```javascript
const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');
```

Get your Stripe test key from: https://dashboard.stripe.com/test/apikeys

### Running the Application

**Development mode:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Usage

### Viewing Subscription Plans

The main page displays all available subscription plans with:
- Plan name and pricing
- List of features
- "Most Popular" badge for highlighted plans
- "Choose Plan" button to initiate payment

### Managing Plans (Admin Panel)

1. Click the "Admin Panel" button (bottom-right corner)
2. Edit existing plans or add new ones
3. Update plan details:
   - Plan name
   - Price and billing interval (month/year)
   - Features (one per line)
   - Stripe Price ID
   - Highlight as "Most Popular"
4. Delete plans or reset to defaults

### Processing Payments

1. Click "Choose [Plan Name]" on any plan
2. Enter email and card details
3. Use test card for development: `4242 4242 4242 4242`
4. Any future expiry date and CVC will work

## Project Structure

```
src/
├── components/
│   ├── PricingCard.jsx       # Individual plan card component
│   ├── PricingCard.css
│   ├── PricingPlans.jsx       # Plans grid layout
│   ├── PricingPlans.css
│   ├── CheckoutForm.jsx       # Stripe payment form
│   ├── CheckoutForm.css
│   ├── AdminPanel.jsx         # Admin interface for managing plans
│   └── AdminPanel.css
├── context/
│   └── PlansContext.jsx       # State management for plans
├── App.jsx                    # Main application component
├── App.css
├── index.css                  # Global styles
└── main.jsx                   # Application entry point
```

## Customization

### Default Plans

Default plans are defined in `src/context/PlansContext.jsx`. You can modify the `defaultPlans` array to change initial plan offerings.

### Styling

The application uses CSS with a purple gradient theme. Main color variables can be found in component CSS files:
- Primary gradient: `#667eea` to `#764ba2`
- Accent colors defined in individual component styles

### Stripe Integration

To enable real payment processing:

1. Get your Stripe API keys from the Stripe Dashboard
2. Update the publishable key in `src/App.jsx`
3. Create a backend endpoint to handle payment intents
4. Update `CheckoutForm.jsx` to call your backend API
5. Add proper error handling and webhooks

## Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Stripe**: Payment processing
- **@stripe/stripe-js**: Stripe JavaScript SDK
- **@stripe/react-stripe-js**: Stripe React components
- **localStorage**: Client-side data persistence

## GitHub Actions CI/CD

This project includes automated workflows for continuous integration and deployment:

### Automated Workflows

1. **Build and Deploy** - Runs on every push and PR
   - Tests build on Node.js 18.x and 20.x
   - Uploads build artifacts
   - Ready for GitHub Pages deployment

2. **Continuous Integration (CI)** - Code quality checks
   - Runs ESLint for code linting
   - Verifies successful builds
   - Reports build size and output

3. **Deploy to GitHub Pages** - Manual or automatic deployment
   - Builds optimized production bundle
   - Deploys to GitHub Pages
   - Accessible from Actions tab

### Deploying to GitHub Pages

1. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Update Base Path (if needed):**
   - Edit `VITE_BASE_PATH` in `.github/workflows/deploy-pages.yml`
   - Set to `/repo-name/` for project pages

3. **Deploy:**
   - **Automatic**: Push to `main` branch
   - **Manual**: Actions tab → "Deploy to GitHub Pages" → "Run workflow"

For more details, see [.github/workflows/README.md](.github/workflows/README.md)

## Security Notes

- Never commit real Stripe secret keys to version control
- Always validate payments on the server-side
- Use environment variables for API keys
- Implement proper authentication for the admin panel in production

## License

MIT
