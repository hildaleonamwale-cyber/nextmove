/*
  # Optimize Indexes and RLS Performance

  1. Add Missing Foreign Key Indexes
    - idx_promoted_properties_property_id on promoted_properties(property_id)
    - idx_properties_agent_id on properties(agent_id)
    - idx_team_members_user_id on team_members(user_id)
    - idx_transactions_wallet_id on transactions(wallet_id)

  2. Optimize RLS Policies
    - Replace auth.uid() calls with (select auth.uid()) for better performance
    - Consolidate multiple SELECT policies with OR conditions
    - Restrict viewing_requests INSERT policy to authenticated users only

  3. Index Management
    - Keep performance indexes as they will be used after first queries

  4. Performance Impact
    - Faster foreign key lookups
    - Reduced policy evaluation overhead
    - Better query plan generation
*/

-- Add missing foreign key indexes
CREATE INDEX IF NOT EXISTS idx_promoted_properties_property_id 
  ON promoted_properties(property_id);

CREATE INDEX IF NOT EXISTS idx_properties_agent_id 
  ON properties(agent_id);

CREATE INDEX IF NOT EXISTS idx_team_members_user_id 
  ON team_members(user_id);

CREATE INDEX IF NOT EXISTS idx_transactions_wallet_id 
  ON transactions(wallet_id);

-- Drop and recreate profiles policies with optimized auth calls
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can read team members profiles" ON profiles;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = (select auth.uid()));

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

CREATE POLICY "Users can read team members profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.user_id = (select auth.uid())
      AND team_members.company_id = profiles.id
    )
  );

-- Drop and recreate properties policies with optimized auth calls
DROP POLICY IF EXISTS "Users can view own properties" ON properties;
DROP POLICY IF EXISTS "Users can create properties" ON properties;
DROP POLICY IF EXISTS "Users can update own properties" ON properties;
DROP POLICY IF EXISTS "Users can delete own properties" ON properties;

CREATE POLICY "Users can view own properties"
  ON properties FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()) OR agent_id = (select auth.uid()));

CREATE POLICY "Users can create properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()) OR agent_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()) OR agent_id = (select auth.uid()));

CREATE POLICY "Users can delete own properties"
  ON properties FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Drop and recreate viewing_requests policies
DROP POLICY IF EXISTS "Users can view requests for own properties" ON viewing_requests;
DROP POLICY IF EXISTS "Users can create viewing requests" ON viewing_requests;
DROP POLICY IF EXISTS "Users can update own viewing requests" ON viewing_requests;

CREATE POLICY "Users can view requests for own properties"
  ON viewing_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = viewing_requests.property_id
      AND properties.user_id = (select auth.uid())
    )
  );

CREATE POLICY "Users can create viewing requests"
  ON viewing_requests FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = viewing_requests.property_id
    )
  );

CREATE POLICY "Users can update own viewing requests"
  ON viewing_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = viewing_requests.property_id
      AND properties.user_id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = viewing_requests.property_id
      AND properties.user_id = (select auth.uid())
    )
  );

-- Drop and recreate wallet policies
DROP POLICY IF EXISTS "Users can view own wallet" ON wallet;
DROP POLICY IF EXISTS "Users can update own wallet" ON wallet;

CREATE POLICY "Users can view own wallet"
  ON wallet FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can update own wallet"
  ON wallet FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- Drop and recreate transactions policies
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can create transactions" ON transactions;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

-- Drop and recreate subscriptions policies
DROP POLICY IF EXISTS "Users can view own subscription" ON subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON subscriptions;

CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can update own subscription"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- Drop and recreate team_members policies
DROP POLICY IF EXISTS "Users can view team members" ON team_members;
DROP POLICY IF EXISTS "Company admins can add team members" ON team_members;
DROP POLICY IF EXISTS "Company admins can update team members" ON team_members;
DROP POLICY IF EXISTS "Company admins can remove team members" ON team_members;

CREATE POLICY "Users can view team members"
  ON team_members FOR SELECT
  TO authenticated
  USING (company_id = (select auth.uid()) OR user_id = (select auth.uid()));

CREATE POLICY "Company admins can add team members"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (company_id = (select auth.uid()));

CREATE POLICY "Company admins can update team members"
  ON team_members FOR UPDATE
  TO authenticated
  USING (company_id = (select auth.uid()))
  WITH CHECK (company_id = (select auth.uid()));

CREATE POLICY "Company admins can remove team members"
  ON team_members FOR DELETE
  TO authenticated
  USING (company_id = (select auth.uid()));

-- Drop and recreate promoted_properties policies
DROP POLICY IF EXISTS "Users can view own promoted properties" ON promoted_properties;
DROP POLICY IF EXISTS "Users can create promotions" ON promoted_properties;
DROP POLICY IF EXISTS "Users can update own promotions" ON promoted_properties;

CREATE POLICY "Users can view own promoted properties"
  ON promoted_properties FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create promotions"
  ON promoted_properties FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own promotions"
  ON promoted_properties FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));
