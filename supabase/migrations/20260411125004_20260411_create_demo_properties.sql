/*
  # Create Demo Properties for Sarah

  1. Sample Properties
    - Modern Downtown Penthouse (active, 245 views)
    - Luxury Suburban Villa (active, 156 views)

  2. Sample Viewing Requests
    - Request from John Smith (pending)
    - Request from Emma Wilson (approved)
*/

DO $$
DECLARE
  sarah_id UUID := 'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid;
  property_id_1 UUID;
  property_id_2 UUID;
BEGIN
  -- Create first property
  INSERT INTO properties (
    user_id, title, description, price, property_type, location, bedrooms, bathrooms, size_sqm, status, views_count, created_at, updated_at
  ) VALUES (
    sarah_id,
    'Modern Downtown Penthouse',
    'Stunning 2-bedroom penthouse with city views and premium amenities. Perfect for urban professionals.',
    850000,
    'apartment',
    'Downtown District',
    2,
    2,
    150,
    'active',
    245,
    now() - interval '5 days',
    now() - interval '5 days'
  )
  RETURNING id INTO property_id_1;

  -- Create second property
  INSERT INTO properties (
    user_id, title, description, price, property_type, location, bedrooms, bathrooms, size_sqm, status, views_count, created_at, updated_at
  ) VALUES (
    sarah_id,
    'Luxury Suburban Villa',
    '5-bedroom villa with garden and swimming pool in an exclusive gated community. Premium finishes throughout.',
    1200000,
    'house',
    'Suburban Heights',
    5,
    3,
    400,
    'active',
    156,
    now() - interval '10 days',
    now() - interval '10 days'
  )
  RETURNING id INTO property_id_2;

  -- Create viewing requests
  INSERT INTO viewing_requests (
    property_id, client_name, client_email, client_phone, status, created_at, updated_at
  ) VALUES (
    property_id_1,
    'John Smith',
    'john@example.com',
    '+1-555-0101',
    'pending',
    now() - interval '2 days',
    now() - interval '2 days'
  );

  INSERT INTO viewing_requests (
    property_id, client_name, client_email, client_phone, status, created_at, updated_at
  ) VALUES (
    property_id_2,
    'Emma Wilson',
    'emma@example.com',
    '+1-555-0102',
    'approved',
    now() - interval '1 day',
    now() - interval '1 day'
  );

END $$;
