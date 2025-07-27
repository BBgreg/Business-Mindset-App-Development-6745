# Master Business Owner Mindset App

A comprehensive React application featuring AI-powered business coaching based on Greg Head's proven methodologies, with Supabase backend, Stripe subscriptions, and premium features.

## Features

- **AI-Powered Coaching**: Get personalized business insights in Greg Head's voice
- **User Authentication**: Secure sign-up/sign-in with Supabase Auth
- **Chat History**: Persistent conversation storage for logged-in users
- **Premium Subscriptions**: Stripe-powered subscription management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live subscription status updates

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **AI**: OpenAI GPT-4, Groq, or Gemini (configurable)
- **Payments**: Stripe Checkout & Webhooks
- **Deployment**: Vercel

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd master-business-owner-mindset-app
npm install
```

### 2. Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Required for frontend
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Required for Edge Functions (set in Supabase dashboard)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
YOUR_APP_URL=https://your-app.vercel.app
OPENAI_API_KEY=sk-...
AI_MODEL_CHOICE=openai
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Database Setup

Run the migration in your Supabase dashboard:

```sql
-- Copy and run the contents of supabase/migrations/001_initial_schema.sql
```

### 4. Deploy Edge Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy ai-chat
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook
```

### 5. Configure Stripe

1. Create a Stripe account and get your keys
2. Create a subscription product and price
3. Set up webhook endpoint: `https://your-project.supabase.co/functions/v1/stripe-webhook`
4. Add webhook events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

### 6. Run Development Server

```bash
npm run dev
```

## Database Schema

### Tables

- **profiles**: User profiles with premium status
- **chat_messages**: Persistent chat history
- **subscriptions**: Stripe subscription tracking

### Edge Functions

- **ai-chat**: Handles AI API calls securely
- **create-checkout-session**: Creates Stripe checkout sessions
- **stripe-webhook**: Processes Stripe webhook events

## AI Configuration

The app supports multiple AI providers:

- **OpenAI**: GPT-4o (default)
- **Groq**: Llama3-8b-8192
- **Gemini**: Gemini-2.0-flash

Set `AI_MODEL_CHOICE` environment variable to switch providers.

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

### Supabase Configuration

1. Set Edge Function secrets in Supabase dashboard
2. Configure RLS policies
3. Set up webhook endpoints

## Security

- Row Level Security (RLS) enabled on all tables
- API keys stored securely in Supabase secrets
- Stripe webhook signature verification
- User data isolation

## Support

For issues or questions:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure Supabase project is properly configured
4. Test Edge Functions in Supabase dashboard

## License

MIT License - see LICENSE file for details