/*
  # Initialize Nextmove Core Schema

  1. New Tables
    - `profiles` - User profiles linked to auth.users
    - `properties` - Real estate listings
    - `viewing_requests` - Inquiries/viewing requests from clients
    - `wallet` - User wallet balances and metadata
    - `transactions` - Wallet transaction history
    - `subscriptions` - User subscription plans
    - `team_members` - Team/agency staff
    - `promoted_properties` - Track sponsored listings
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for data ownership
    
  3. Key Features
    - User roles: admin, premium, worker, basic
    - Property status: active, pending, sold
    - Request status: pending, approved, declined
    - Wallet transactions: top-up, sponsorship, subscription
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  role text NOT NULL DEFAULT 'basic', -- admin, premium, worker, basic
  company_name text,
  bio text,
  avatar_url text,
  phone text,
  wallet_balance numeric DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  status text NOT NULL DEFAULT 'active', -- active, pending, sold
  property_type text NOT NULL, -- house, stand, commercial, etc
  location text NOT NULL,
  bedrooms integer,
  bathrooms integer,
  size_sqm numeric,
  image_url text,
  images jsonb DEFAULT '[]',
  featured boolean DEFAULT false,
  views_count integer DEFAULT 0,
  is_promoted boolean DEFAULT false,
  promoted_until timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create viewing requests table
CREATE TABLE IF NOT EXISTS viewing_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text NOT NULL,
  status text NOT NULL DEFAULT 'pending', -- pending, approved, declined
  scheduled_date timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create wallet table
CREATE TABLE IF NOT EXISTS wallet (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  balance numeric NOT NULL DEFAULT 0,
  currency text DEFAULT 'USD',
  last_topup_date timestamptz,
  total_spent numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_id uuid NOT NULL REFERENCES wallet(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  type text NOT NULL, -- topup, sponsorship, subscription, refund
  description text,
  balance_after numeric,
  reference_id text,
  created_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  plan text NOT NULL DEFAULT 'basic', -- basic, pro, enterprise
  status text NOT NULL DEFAULT 'active', -- active, expired, cancelled
  billing_cycle text DEFAULT 'monthly', -- monthly, yearly
  current_period_start timestamptz DEFAULT now(),
  current_period_end timestamptz,
  renewal_date timestamptz,
  price_paid numeric,
  auto_renew boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'agent', -- admin, manager, agent
  joined_date timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  UNIQUE(company_id, user_id)
);

-- Create promoted properties table (for tracking sponsorship history)
CREATE TABLE IF NOT EXISTS promoted_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  cost_per_day numeric DEFAULT 1,
  total_cost numeric,
  status text DEFAULT 'active', -- active, expired, cancelled
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE viewing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE promoted_properties ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - PROFILES
-- ============================================
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read team members profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.user_id = auth.uid()
      AND team_members.company_id = profiles.id
    )
  );

-- ============================================
-- RLS POLICIES - PROPERTIES
-- ============================================
CREATE POLICY "Users can view own properties"
  ON properties FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = agent_id);

CREATE POLICY "Users can create properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = agent_id)
  WITH CHECK (auth.uid() = user_id OR auth.uid() = agent_id);

CREATE POLICY "Users can delete own properties"
  ON properties FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES - VIEWING REQUESTS
-- ============================================
CREATE POLICY "Users can view requests for own properties"
  ON viewing_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = viewing_requests.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create viewing requests"
  ON viewing_requests FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can update own viewing requests"
  ON viewing_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = viewing_requests.property_id
      AND properties.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = viewing_requests.property_id
      AND properties.user_id = auth.uid()
    )
  );

-- ============================================
-- RLS POLICIES - WALLET
-- ============================================
CREATE POLICY "Users can view own wallet"
  ON wallet FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own wallet"
  ON wallet FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES - TRANSACTIONS
-- ============================================
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES - SUBSCRIPTIONS
-- ============================================
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES - TEAM MEMBERS
-- ============================================
CREATE POLICY "Users can view team members"
  ON team_members FOR SELECT
  TO authenticated
  USING (auth.uid() = company_id OR auth.uid() = user_id);

CREATE POLICY "Company admins can add team members"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = company_id);

CREATE POLICY "Company admins can update team members"
  ON team_members FOR UPDATE
  TO authenticated
  USING (auth.uid() = company_id)
  WITH CHECK (auth.uid() = company_id);

CREATE POLICY "Company admins can remove team members"
  ON team_members FOR DELETE
  TO authenticated
  USING (auth.uid() = company_id);

-- ============================================
-- RLS POLICIES - PROMOTED PROPERTIES
-- ============================================
CREATE POLICY "Users can view own promoted properties"
  ON promoted_properties FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create promotions"
  ON promoted_properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own promotions"
  ON promoted_properties FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- INDEXES for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_properties_user_id ON properties(user_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_viewing_requests_property_id ON viewing_requests(property_id);
CREATE INDEX IF NOT EXISTS idx_viewing_requests_status ON viewing_requests(status);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_company_id ON team_members(company_id);
CREATE INDEX IF NOT EXISTS idx_promoted_properties_user_id ON promoted_properties(user_id);
