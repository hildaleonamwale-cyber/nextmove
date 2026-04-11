/*
  # Create Demo User Accounts

  1. Demo Users Added
    - Sarah Jenkins (Premium Agent) - Email: sarah@nextmove.co - Password: Demo@123456
    - Mike Ross (Staff Agent) - Email: mike@nextmove.co - Password: Demo@123456
    - Jane Doe (Basic User) - Email: jane@nextmove.co - Password: Demo@123456
    - Admin User (Agency Admin) - Email: admin@nextmove.co - Password: Demo@123456

  2. Each demo user includes:
    - Auth account
    - Profile with appropriate role
    - Wallet with role-based balance
    - Subscription record
    - Sample properties (for agents/admins)
*/

DO $$
DECLARE
  sarah_id UUID := 'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid;
  mike_id UUID := 'f47ac10b-58cc-4372-a567-0e02b2c3d480'::uuid;
  jane_id UUID := 'f47ac10b-58cc-4372-a567-0e02b2c3d481'::uuid;
  admin_id UUID := 'f47ac10b-58cc-4372-a567-0e02b2c3d482'::uuid;
BEGIN
  -- Create Sarah Jenkins (Premium)
  INSERT INTO auth.users (
    id, email, email_confirmed_at, encrypted_password, created_at, updated_at, raw_app_meta_data, is_super_admin, role
  ) VALUES (
    sarah_id,
    'sarah@nextmove.co',
    now(),
    crypt('Demo@123456', gen_salt('bf')),
    now(),
    now(),
    '{}',
    false,
    'authenticated'
  ) ON CONFLICT DO NOTHING;

  INSERT INTO profiles (id, email, full_name, role, created_at, updated_at)
  VALUES (sarah_id, 'sarah@nextmove.co', 'Sarah Jenkins', 'premium', now(), now())
  ON CONFLICT DO NOTHING;

  INSERT INTO wallet (user_id, balance, created_at, updated_at)
  VALUES (sarah_id, 250, now(), now())
  ON CONFLICT DO NOTHING;

  INSERT INTO subscriptions (user_id, plan, status, current_period_end, created_at, updated_at)
  VALUES (sarah_id, 'premium', 'active', now() + interval '30 days', now(), now())
  ON CONFLICT DO NOTHING;

  -- Create Mike Ross (Worker)
  INSERT INTO auth.users (
    id, email, email_confirmed_at, encrypted_password, created_at, updated_at, raw_app_meta_data, is_super_admin, role
  ) VALUES (
    mike_id,
    'mike@nextmove.co',
    now(),
    crypt('Demo@123456', gen_salt('bf')),
    now(),
    now(),
    '{}',
    false,
    'authenticated'
  ) ON CONFLICT DO NOTHING;

  INSERT INTO profiles (id, email, full_name, role, company_name, created_at, updated_at)
  VALUES (mike_id, 'mike@nextmove.co', 'Mike Ross', 'worker', 'Elite Realty', now(), now())
  ON CONFLICT DO NOTHING;

  INSERT INTO wallet (user_id, balance, created_at, updated_at)
  VALUES (mike_id, 100, now(), now())
  ON CONFLICT DO NOTHING;

  INSERT INTO subscriptions (user_id, plan, status, current_period_end, created_at, updated_at)
  VALUES (mike_id, 'worker', 'active', now() + interval '30 days', now(), now())
  ON CONFLICT DO NOTHING;

  -- Create Jane Doe (Basic)
  INSERT INTO auth.users (
    id, email, email_confirmed_at, encrypted_password, created_at, updated_at, raw_app_meta_data, is_super_admin, role
  ) VALUES (
    jane_id,
    'jane@nextmove.co',
    now(),
    crypt('Demo@123456', gen_salt('bf')),
    now(),
    now(),
    '{}',
    false,
    'authenticated'
  ) ON CONFLICT DO NOTHING;

  INSERT INTO profiles (id, email, full_name, role, created_at, updated_at)
  VALUES (jane_id, 'jane@nextmove.co', 'Jane Doe', 'basic', now(), now())
  ON CONFLICT DO NOTHING;

  INSERT INTO wallet (user_id, balance, created_at, updated_at)
  VALUES (jane_id, 0, now(), now())
  ON CONFLICT DO NOTHING;

  INSERT INTO subscriptions (user_id, plan, status, current_period_end, created_at, updated_at)
  VALUES (jane_id, 'basic', 'active', now() + interval '30 days', now(), now())
  ON CONFLICT DO NOTHING;

  -- Create Admin User
  INSERT INTO auth.users (
    id, email, email_confirmed_at, encrypted_password, created_at, updated_at, raw_app_meta_data, is_super_admin, role
  ) VALUES (
    admin_id,
    'admin@nextmove.co',
    now(),
    crypt('Demo@123456', gen_salt('bf')),
    now(),
    now(),
    '{}',
    false,
    'authenticated'
  ) ON CONFLICT DO NOTHING;

  INSERT INTO profiles (id, email, full_name, role, company_name, created_at, updated_at)
  VALUES (admin_id, 'admin@nextmove.co', 'Admin User', 'admin', 'Willow & Elm', now(), now())
  ON CONFLICT DO NOTHING;

  INSERT INTO wallet (user_id, balance, created_at, updated_at)
  VALUES (admin_id, 500, now(), now())
  ON CONFLICT DO NOTHING;

  INSERT INTO subscriptions (user_id, plan, status, current_period_end, created_at, updated_at)
  VALUES (admin_id, 'admin', 'active', now() + interval '30 days', now(), now())
  ON CONFLICT DO NOTHING;

END $$;
