# Complete Deployment Guide

This guide will walk you through deploying your Master Business Owner Mindset app with full Supabase integration.

## Prerequisites

Before starting, ensure you have:
- A Supabase project set up
- A GitHub account
- A Vercel account
- A Stripe account (for payments)
- OpenAI API account (for AI functionality)

## Step 1: GitHub Repository Setup

### 1.1 Create and Push to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Master Business Owner Mindset App"

# Create repository on GitHub and add remote
git remote add origin https://github.com/yourusername/master-business-owner-app.git

# Push to GitHub
git push -u origin main
```

### 1.2 Repository Structure
Ensure your repository includes:
```
├── src/                    # React application
├── supabase/
│   ├── functions/         # Edge Functions
│   │   ├── ai-chat/
│   │   ├── create-checkout-session/
│   │   └── stripe-webhook/
│   └── migrations/        # Database schema
├── package.json
├── .env.example
└── README.md
```

## Step 2: Supabase Configuration

### 2.1 Deploy Edge Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy all Edge Functions
supabase functions deploy ai-chat
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook
```

### 2.2 Set Supabase Secrets

In your Supabase dashboard, go to Settings > Edge Functions and set these secrets:

```bash
# Required for AI functionality
OPENAI_API_KEY=sk-your-openai-api-key
AI_MODEL_CHOICE=openai

# Required for Stripe integration
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PRICE_ID=price_your-stripe-price-id
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Will be updated after Vercel deployment
YOUR_APP_URL=http://localhost:5173

# Service role key (found in Supabase Settings > API)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 2.3 Verify Database Schema

Ensure your database tables are created by running the migration:
```sql
-- This should already be done, but verify in Supabase SQL Editor
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'chat_messages', 'subscriptions');
```

## Step 3: Stripe Configuration

### 3.1 Create Stripe Products

1. **Log into Stripe Dashboard**
2. **Create a Product:**
   - Go to Products → Add Product
   - Name: "Premium Business Coaching"
   - Description: "Access to advanced AI coaching and premium features"

3. **Create Recurring Price:**
   - Price: $97.00
   - Billing: Monthly
   - Copy the Price ID (starts with `price_`)

### 3.2 Set Up Webhook Endpoint

1. **Go to Developers → Webhooks**
2. **Add Endpoint:**
   - URL: `https://pbmydonmjmmwlufboeka.supabase.co/functions/v1/stripe-webhook`
   - Events to send:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

3. **Copy Webhook Secret** (starts with `whsec_`)

## Step 4: Vercel Deployment

### 4.1 Connect GitHub Repository

1. **Go to Vercel Dashboard**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure Project:**
   - Framework Preset: Vite
   - Root Directory: `.` (default)
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 4.2 Set Environment Variables

In Vercel Project Settings → Environment Variables, add:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://pbmydonmjmmwlufboeka.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBibXlkb25tam1td2x1ZmJvZWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2NTUyMDQsImV4cCI6MjA2OTIzMTIwNH0.pBD_vX_TLZXUw-DQuOAk6N-lLEChp-s3t5ojuLHVoDU

# Optional: Firebase (if using Firebase Auth as fallback)
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 4.3 Deploy

Click **"Deploy"** and wait for the build to complete.

## Step 5: Post-Deployment Configuration

### 5.1 Update Supabase Secrets

After Vercel deployment, update the `YOUR_APP_URL` secret in Supabase:

```bash
# In Supabase Dashboard → Settings → Edge Functions
YOUR_APP_URL=https://your-app-name.vercel.app
```

### 5.2 Update Stripe Webhook URL

If your Vercel domain changed, update the Stripe webhook URL:
- Keep the Supabase Edge Function URL (it doesn't change)
- URL: `https://pbmydonmjmmwlufboeka.supabase.co/functions/v1/stripe-webhook`

## Step 6: Testing Your Deployment

### 6.1 Test Authentication
1. Visit your deployed app
2. Try signing up with a new account
3. Verify profile creation in Supabase dashboard

### 6.2 Test AI Chat
1. Sign in to your app
2. Go to AI Insights section
3. Send a test message
4. Verify message appears in `chat_messages` table

### 6.3 Test Stripe Integration
1. Click "Upgrade to Premium"
2. Complete test payment (use Stripe test card: 4242 4242 4242 4242)
3. Verify subscription in Supabase `subscriptions` table
4. Check that `is_premium` is set to `true` in `profiles` table

## Step 7: Domain Setup (Optional)

### 7.1 Custom Domain
1. **In Vercel:** Go to Project Settings → Domains
2. **Add your domain** and configure DNS
3. **Update Supabase secrets** with new domain:
   ```bash
   YOUR_APP_URL=https://yourdomain.com
   ```

## Troubleshooting

### Common Issues:

1. **Edge Functions not working:**
   - Check Supabase logs in Dashboard → Edge Functions
   - Verify all secrets are set correctly
   - Ensure function URLs are correct

2. **Stripe webhook failures:**
   - Verify webhook endpoint URL
   - Check webhook secret matches
   - Review Stripe webhook logs

3. **AI chat not responding:**
   - Verify OpenAI API key is valid
   - Check Supabase function logs
   - Ensure user is authenticated

4. **Authentication issues:**
   - Verify Supabase URL and anon key
   - Check RLS policies are enabled
   - Review browser console for errors

### Support Resources:
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

## Security Checklist

- ✅ Environment variables are set in Vercel (not in code)
- ✅ Supabase RLS policies are enabled
- ✅ Stripe webhook signature verification is working
- ✅ API keys are stored securely in Supabase secrets
- ✅ Database access is properly restricted

## Monitoring

Set up monitoring for:
- Vercel deployment status
- Supabase function execution
- Stripe webhook delivery
- Error tracking in production

Your app is now fully deployed and ready for production use!