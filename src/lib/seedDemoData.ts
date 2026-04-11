import { supabase } from './supabase';

const DEMO_USERS = [
  {
    email: 'demo_basic@example.com',
    password: 'Demo123456!',
    fullName: 'John Basic',
    role: 'basic'
  },
  {
    email: 'demo_premium@example.com',
    password: 'Demo123456!',
    fullName: 'Sarah Premium',
    role: 'premium'
  },
  {
    email: 'demo_admin@example.com',
    password: 'Demo123456!',
    fullName: 'Admin User',
    role: 'admin'
  }
];

const DEMO_PROPERTIES = [
  {
    title: 'Luxury Waterfront Penthouse',
    description: 'Stunning 4-bedroom penthouse with panoramic city and water views. Premium finishes, smart home automation, private elevator access.',
    price: 850000,
    propertyType: 'Apartment',
    location: 'Downtown Marina District, City Center',
    bedrooms: 4,
    bathrooms: 3,
    sizeSqm: 3500,
  },
  {
    title: 'Modern Family Villa',
    description: 'Contemporary 5-bedroom villa on 2 acres of manicured grounds. Resort-style pool, tennis court, and guest house.',
    price: 1200000,
    propertyType: 'House',
    location: 'Hillcrest Estates, Suburban Heights',
    bedrooms: 5,
    bathrooms: 4,
    sizeSqm: 5200,
  },
  {
    title: 'Charming Urban Townhouse',
    description: 'Renovated 3-story townhouse in trendy neighborhood. Rooftop terrace, modern kitchen, and walk-in closets throughout.',
    price: 450000,
    propertyType: 'Townhouse',
    location: 'Arts District, Central Quarter',
    bedrooms: 3,
    bathrooms: 2,
    sizeSqm: 2100,
  },
  {
    title: 'Beachfront Resort Condo',
    description: 'Ground-floor condo with direct beach access. Sunset views, oceanfront pool, and concierge services included.',
    price: 650000,
    propertyType: 'Condo',
    location: 'Coastal Waves Beach Resort',
    bedrooms: 2,
    bathrooms: 2,
    sizeSqm: 1800,
  },
  {
    title: 'Historic Manor Estate',
    description: 'Restored 6-bedroom historic estate with original details. Circular driveway, guest cottage, and 8 acres of private forest.',
    price: 1500000,
    propertyType: 'House',
    location: 'Countryside Heritage Valley',
    bedrooms: 6,
    bathrooms: 5,
    sizeSqm: 7500,
  },
];

export const createDemoUsers = async () => {
  const results = [];

  for (const user of DEMO_USERS) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });

      if (error) {
        results.push({ email: user.email, success: false, error: error.message });
        continue;
      }

      if (!data.user) {
        results.push({ email: user.email, success: false, error: 'No user returned' });
        continue;
      }

      const userId = data.user.id;

      // Create profile
      await supabase.from('profiles').insert([
        {
          id: userId,
          email: user.email,
          full_name: user.fullName,
          role: user.role,
          company_name: user.role === 'premium' ? 'Premium Estates' : user.role === 'admin' ? 'Admin Corp' : 'John Properties',
          is_active: true,
        },
      ]);

      // Create wallet
      await supabase.from('wallet').insert([
        {
          user_id: userId,
          balance: user.role === 'basic' ? 0 : user.role === 'premium' ? 100 : user.role === 'admin' ? 500 : 0,
        },
      ]);

      // Create subscription
      await supabase.from('subscriptions').insert([
        {
          user_id: userId,
          plan: user.role,
          status: 'active',
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]);

      results.push({ email: user.email, success: true, userId });
    } catch (error) {
      results.push({ email: user.email, success: false, error: String(error) });
    }
  }

  return results;
};

export const createDemoProperties = async (userEmail: string = 'demo_premium@example.com') => {
  try {
    // Get the user ID
    const { data: userData } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', userEmail)
      .maybeSingle();

    if (!userData) {
      throw new Error(`User ${userEmail} not found`);
    }

    const userId = userData.id;
    const propertyResults = [];

    for (const property of DEMO_PROPERTIES) {
      const { data, error } = await supabase
        .from('properties')
        .insert([
          {
            user_id: userId,
            title: property.title,
            description: property.description,
            price: property.price,
            property_type: property.propertyType,
            location: property.location,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            size_sqm: property.sizeSqm,
            status: 'active',
            featured: property.title.includes('Luxury') || property.title.includes('Modern') || property.title.includes('Beachfront'),
          },
        ])
        .select()
        .maybeSingle();

      if (error) {
        propertyResults.push({ title: property.title, success: false, error: error.message });
      } else {
        propertyResults.push({ title: property.title, success: true, propertyId: data?.id });
      }
    }

    return propertyResults;
  } catch (error) {
    throw new Error(`Failed to create demo properties: ${String(error)}`);
  }
};

export const createDemoViewingRequests = async () => {
  try {
    const { data: properties } = await supabase
      .from('properties')
      .select('id, title')
      .limit(3);

    if (!properties || properties.length === 0) {
      throw new Error('No properties found for viewing requests');
    }

    const viewingRequests = [
      {
        propertyId: properties[0].id,
        clientName: 'Michael Johnson',
        clientEmail: 'michael.johnson@email.com',
        clientPhone: '+1-555-0101',
        notes: 'Interested in viewing this weekend. Prefer afternoon times.',
      },
      {
        propertyId: properties[1].id,
        clientName: 'Emma Thompson',
        clientEmail: 'emma.thompson@email.com',
        clientPhone: '+1-555-0102',
        notes: 'Confirmed viewing. Bringing real estate inspector.',
      },
      {
        propertyId: properties[2].id,
        clientName: 'James Rodriguez',
        clientEmail: 'james.rodriguez@email.com',
        clientPhone: '+1-555-0103',
        notes: 'First time viewing, coming from out of state.',
      },
    ];

    const results = [];
    for (const request of viewingRequests) {
      const { error } = await supabase.from('viewing_requests').insert([
        {
          property_id: request.propertyId,
          client_name: request.clientName,
          client_email: request.clientEmail,
          client_phone: request.clientPhone,
          status: 'pending',
          notes: request.notes,
        },
      ]);

      results.push({
        property: request.propertyId,
        client: request.clientName,
        success: !error,
        error: error?.message,
      });
    }

    return results;
  } catch (error) {
    throw new Error(`Failed to create demo viewing requests: ${String(error)}`);
  }
};
