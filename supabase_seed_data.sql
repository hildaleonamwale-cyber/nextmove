-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert Test User 1: Sarah Jenkins
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES 
(
  '00000000-0000-0000-0000-000000000000', 
  '11111111-1111-1111-1111-111111111111', 
  'authenticated', 
  'authenticated', 
  'sarah@nextmove.com', 
  crypt('password123', gen_salt('bf')), 
  now(), now(), now(), 
  '{"provider":"email","providers":["email"]}', 
  '{"first_name":"Sarah","last_name":"Jenkins"}', 
  now(), now(), '', '', '', ''
) ON CONFLICT (id) DO NOTHING;

-- Insert Test User 2: John Doe
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES 
(
  '00000000-0000-0000-0000-000000000000', 
  '22222222-2222-2222-2222-222222222222', 
  'authenticated', 
  'authenticated', 
  'john@nextmove.com', 
  crypt('password123', gen_salt('bf')), 
  now(), now(), now(), 
  '{"provider":"email","providers":["email"]}', 
  '{"first_name":"John","last_name":"Doe"}', 
  now(), now(), '', '', '', ''
) ON CONFLICT (id) DO NOTHING;

-- Update their profiles in public.users (created by the trigger)
UPDATE public.users 
SET first_name = 'Sarah', last_name = 'Jenkins', role = 'premium', avatar_url = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
WHERE id = '11111111-1111-1111-1111-111111111111';

UPDATE public.users 
SET first_name = 'John', last_name = 'Doe', role = 'worker', avatar_url = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
WHERE id = '22222222-2222-2222-2222-222222222222';

-- Insert demo properties for Sarah Jenkins
INSERT INTO public.properties (id, title, description, price, category, subtype, status, agent_id, images) VALUES
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'Modern Architectural Masterpiece',
  'Experience the pinnacle of luxury living in this stunning contemporary home. Featuring floor-to-ceiling windows, a private infinity pool, and state-of-the-art smart home integration.',
  1250000,
  'residential',
  'house',
  'available',
  '11111111-1111-1111-1111-111111111111',
  ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400']
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'Premium CBD Office Floor',
  'Entire 4th floor available in the highly sought-after Nexus Tower in the CBD. The space features a pristine modern reception, 8 private glass-partitioned offices, and a large open-plan central working area.',
  4500,
  'commercial',
  'office',
  'available',
  '11111111-1111-1111-1111-111111111111',
  ARRAY['https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=400']
) ON CONFLICT (id) DO NOTHING;

-- Insert demo properties for John Doe
INSERT INTO public.properties (id, title, description, price, category, subtype, status, agent_id, images) VALUES
(
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'Borrowdale Brooke Phase 2 Plot',
  'An incredible opportunity to build your dream home in the secure, gated community of Borrowdale Brooke Phase 2. This plot is perfectly flat, heavily wooded with mature indigenous trees, and fully serviced.',
  180000,
  'stand',
  'land',
  'available',
  '22222222-2222-2222-2222-222222222222',
  ARRAY['https://i.pinimg.com/736x/98/04/69/980469f630d50176a5ac8c663437e632.jpg', 'https://i.pinimg.com/736x/53/0f/1a/530f1ade4b644c91dfed9d53a072b905.jpg']
),
(
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  'Spacious Ensuite Room in Avondale',
  'Large private bedroom available in a quiet shared house in Avondale. The room features its own ensuite bathroom, built-in cupboards, and a private entrance leading directly to the garden.',
  250,
  'room',
  'room',
  'available',
  '22222222-2222-2222-2222-222222222222',
  ARRAY['https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=400']
) ON CONFLICT (id) DO NOTHING;
