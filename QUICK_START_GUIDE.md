# Complete Setup Guide - Real Estate Platform

## What Was Fixed

1. **Database RLS Policies** - Fixed to allow proper data access across authenticated users
2. **User Signup Flow** - Fixed authentication and automatic wallet/subscription creation
3. **Demo Data System** - Created easy-to-use seeding system for testing

## Quick Start (5 minutes)

### Step 1: Seed Demo Data
1. Go to: `http://localhost:3000/admin/seed-demo-data`
2. Click "Create Demo Users, Properties & Requests"
3. Wait for completion - you'll see the credentials

### Step 2: Login with Demo Account
Use any of these test accounts:

**Basic User:**
- Email: `demo_basic@example.com`
- Password: `Demo123456!`
- Wallet: $0

**Premium User:**
- Email: `demo_premium@example.com`
- Password: `Demo123456!`
- Wallet: $100

**Admin User:**
- Email: `demo_admin@example.com`
- Password: `Demo123456!`
- Wallet: $500

### Step 3: Explore the App
- Dashboard shows properties and wallet
- View properties in the listings
- Request property viewings
- Manage your profile

## Demo Data Included

### Users
- 3 demo accounts with different roles
- Unique wallets (basic: $0, premium: $100, admin: $500)
- Active subscriptions for each

### Properties
- 5 luxury properties with full details
- High-quality descriptions and pricing
- Different property types (villa, penthouse, condo, etc.)
- Featured properties highlighted

### Viewing Requests
- Sample viewing requests on 3 properties
- Shows pending and confirmed status
- Full contact information

## Troubleshooting

### "Email already exists" error
- The demo data seeding tries to prevent duplicates
- If you get this error, the demo accounts already exist
- Just use the credentials to login

### Can't see properties
- Make sure you're logged in
- Properties only appear for authenticated users
- Check that the seeding completed successfully

### Wallet shows $0
- This is correct for the basic user
- Premium starts with $100
- Admin starts with $500

### Properties don't appear after login
- Wait a few seconds for the page to load
- Try refreshing the page
- Check browser console for errors (F12)

## Manual User Signup

You can also create accounts manually:
1. Go to `/login`
2. Click "Sign Up"
3. Fill in your email, password, name
4. Select your role
5. You'll automatically get a wallet and subscription

## Features Now Working

✓ User Authentication (Signup/Login/Logout)
✓ Role-based Access (Basic/Premium/Admin)
✓ Property Listings (Browse all properties)
✓ Wallet System (Check balance, view transactions)
✓ Subscriptions (Auto-created on signup)
✓ Viewing Requests (Request property viewings)
✓ User Profiles (View and edit profile)
✓ Company Profiles (For premium/admin users)

## Next Steps

1. Customize the demo property images and descriptions
2. Add payment processing for wallet topups
3. Implement email notifications for viewing requests
4. Add advanced search and filtering
5. Set up property promotion system

## Need Help?

- Check the browser console for detailed error messages (F12)
- Verify your Supabase connection in `.env`
- Make sure all migrations ran successfully
- Check that RLS policies are enabled on all tables
