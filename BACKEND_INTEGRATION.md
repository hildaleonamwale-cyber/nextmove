# Nextmove Backend Integration - Complete Setup Guide

## Overview

The Nextmove real estate platform is now fully integrated with **Supabase**, a modern Backend-as-a-Service (BaaS) solution built on PostgreSQL. All features are now functional with real database operations.

## Architecture

### Database Structure

**Core Tables:**

1. **profiles** - User accounts with roles and metadata
   - Linked to Supabase auth.users
   - Roles: admin, premium, worker, basic
   - Stores wallet balance, contact info, avatar

2. **properties** - Real estate listings
   - Tracks price, location, status (active/pending/sold)
   - Monitors view counts
   - Supports property promotion/sponsorship
   - Property types: house, stand, commercial

3. **viewing_requests** - Client inquiries
   - Links clients to properties
   - Status tracking: pending, approved, declined
   - Stores client contact info and notes

4. **wallet** - User wallet management
   - Balance tracking
   - Currency support
   - Transaction history tracking

5. **transactions** - Financial audit trail
   - Types: topup, sponsorship, subscription, refund
   - Links to wallet for balance history

6. **subscriptions** - Plan management
   - Plans: basic, pro, enterprise
   - Auto-renewal support
   - Billing cycle tracking

7. **team_members** - Agency staff management
   - Roles: admin, manager, agent
   - Links company to employees

8. **promoted_properties** - Sponsorship tracking
   - Cost per day calculation
   - Active/expired status
   - Historical record

### Security

All tables are protected by **Row Level Security (RLS)** policies:

- Users can only view their own data
- Team members can view shared team data
- Admin users have elevated access
- Public endpoints are minimal

## Features Implemented

### 1. Authentication (`src/context/AuthContext.tsx`)

- Email/password signup and signin
- Automatic profile creation on signup
- Initial wallet setup based on role
- Subscription creation for new users
- Auth state persistence and listening

```typescript
const { user, profile, signUp, signIn, signOut } = useAuth();
```

### 2. Properties Management (`src/lib/supabase.ts`)

**Create Property**
```typescript
await createProperty(userId, {
  title: "Modern Villa",
  price: 450000,
  location: "Borrowdale",
  property_type: "house",
  // ... other fields
});
```

**List Properties**
```typescript
const props = await getProperties(userId, role);
```

**Promote Property**
```typescript
await promoteProperty(userId, propertyId, days);
// Automatically deducts from wallet
```

**Update Property**
```typescript
await updateProperty(propertyId, { status: "sold" });
```

### 3. Viewing Requests (`src/lib/supabase.ts`)

**Create Request**
```typescript
await createViewingRequest(propertyId, {
  client_name: "John Doe",
  client_email: "john@example.com",
  client_phone: "077 123 4567"
});
```

**Update Status**
```typescript
await updateViewingRequestStatus(requestId, "approved");
```

**List Requests**
```typescript
const requests = await getViewingRequests(userId, role);
```

### 4. Wallet & Transactions (`src/lib/supabase.ts`)

**Get Balance**
```typescript
const wallet = await getWallet(userId);
console.log(wallet.balance);
```

**Top Up Wallet**
```typescript
const newBalance = await topUpWallet(userId, amount);
```

**View Transaction History**
```typescript
const transactions = await getTransactions(userId);
```

### 5. Subscriptions (`src/lib/supabase.ts`)

**Get Subscription**
```typescript
const sub = await getSubscription(userId);
```

**Update Subscription**
```typescript
await updateSubscription(userId, {
  plan: "pro",
  auto_renew: true
});
```

### 6. Team Management (`src/lib/supabase.ts`)

**Get Team Members**
```typescript
const team = await getTeamMembers(companyId);
```

**Add Team Member**
```typescript
await addTeamMember(companyId, userId, "agent");
```

**Remove Team Member**
```typescript
await removeTeamMember(companyId, userId);
```

## Component Integration

### Overview Dashboard (`src/components/dashboard/Overview.tsx`)

- Real-time stat cards from database
- Recent viewing requests table
- Role-based data filtering
- Auto-loads wallet balance

### Listings (`src/components/dashboard/Listings.tsx`)

- Fetches user's properties
- Shows promotion status
- One-click promotion with wallet deduction
- Real-time property management

### Requests (`src/components/dashboard/Requests.tsx`)

- Displays viewing inquiries
- Approve/decline actions
- Status badge updates
- Client information display

### Wallet (`src/components/dashboard/Wallet.tsx`)

- Real balance display
- Transaction history
- WhatsApp integration for topups
- Spending breakdown

## Getting Started

### 1. Environment Setup

Make sure `.env` contains:
```
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Database Initialization

The database schema is automatically created via migrations. All tables include:
- Proper indexes for performance
- RLS policies for security
- Foreign key constraints
- Timestamps for audit trails

### 3. Create Demo Account

To seed test data:

```typescript
import { seedTestUser } from './lib/seedData';

await seedTestUser('demo@example.com', 'password123');
```

This creates:
- A premium user account
- $500 wallet balance
- 3 sample properties
- 3 sample viewing requests

## API Usage Examples

### Fetch and Display Properties

```typescript
useEffect(() => {
  const loadProperties = async () => {
    const props = await getProperties(user.id, 'premium');
    setProperties(props);
  };
  loadProperties();
}, [user]);
```

### Handle Promotion

```typescript
const handlePromote = async (propertyId) => {
  try {
    await promoteProperty(user.id, propertyId, 30); // 30 days
    // Refresh properties
    const updated = await getProperties(user.id, role);
    setProperties(updated);
    alert('Property promoted successfully!');
  } catch (error) {
    alert(error.message);
  }
};
```

### Real-time Wallet Updates

```typescript
useEffect(() => {
  const loadWallet = async () => {
    const wallet = await getWallet(user.id);
    setBalance(wallet.balance);
  };
  loadWallet();
}, [user]);
```

## Error Handling

All API functions throw descriptive errors:

```typescript
try {
  await createProperty(userId, data);
} catch (error) {
  console.error('Failed to create property:', error.message);
  // Display user-friendly error
}
```

## Performance Optimizations

- Database indexes on frequently queried columns
- Lazy loading of components
- Efficient filtering at database level
- Query results caching where appropriate

## Security Considerations

1. **RLS Policies** - All data access is controlled at database level
2. **Auth State** - Authentication state is persistent across sessions
3. **Secure Endpoints** - No sensitive data in client code
4. **Transaction Records** - All financial operations are audited

## Future Enhancements

1. **Real-time Notifications** - Supabase Realtime for live updates
2. **File Storage** - Supabase Storage for property images
3. **Edge Functions** - Serverless logic for complex operations
4. **Search & Filtering** - Full-text search capabilities
5. **Analytics** - Usage tracking and reporting

## Troubleshooting

### Auth Issues
- Ensure email is confirmed (check Supabase Auth dashboard)
- Verify environment variables are set correctly
- Check browser console for auth errors

### Data Not Loading
- Check browser network tab for API errors
- Verify RLS policies allow user access
- Ensure user session is valid

### Wallet Discrepancies
- Review transaction history for details
- Check promotion records for costs
- Verify subscription charges

## Support

For backend issues:
1. Check Supabase dashboard logs
2. Review browser console for errors
3. Verify database state in SQL editor
4. Check RLS policies in Supabase console

---

**Status**: ✅ Fully Integrated
**Last Updated**: 2026-04-11
**Supabase Project**: Connected
