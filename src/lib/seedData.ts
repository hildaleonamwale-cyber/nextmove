import { supabase } from './supabase';

export const seedDemoData = async (userId: string) => {
  try {
    // Create demo properties
    const properties = [
      {
        user_id: userId,
        title: 'Modern Villa in Borrowdale',
        description: 'Stunning 4-bedroom villa with modern architecture',
        price: 450000,
        status: 'active',
        property_type: 'house',
        location: 'Borrowdale, Harare',
        bedrooms: 4,
        bathrooms: 3,
        size_sqm: 400,
        image_url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400',
        views_count: 234,
      },
      {
        user_id: userId,
        title: 'Luxury Apartment in Avondale',
        description: 'Premium 2-bedroom apartment with city views',
        price: 280000,
        status: 'active',
        property_type: 'house',
        location: 'Avondale, Harare',
        bedrooms: 2,
        bathrooms: 2,
        size_sqm: 150,
        image_url: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=400',
        views_count: 456,
      },
      {
        user_id: userId,
        title: 'Commercial Space in CBD',
        description: 'Prime commercial property ready for business',
        price: 550000,
        status: 'active',
        property_type: 'commercial',
        location: 'CBD, Harare',
        bedrooms: 0,
        bathrooms: 2,
        size_sqm: 200,
        image_url: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=400',
        views_count: 123,
      },
    ];

    const { data: propsData, error: propsError } = await supabase
      .from('properties')
      .insert(properties)
      .select();

    if (propsError) throw propsError;

    // Create demo viewing requests
    if (propsData && propsData.length > 0) {
      const requests = [
        {
          property_id: propsData[0].id,
          client_name: 'John Doe',
          client_email: 'john.doe@example.com',
          client_phone: '077 123 4567',
          status: 'pending',
          notes: 'Interested in viewing on weekend',
        },
        {
          property_id: propsData[1].id,
          client_name: 'Sarah Moyo',
          client_email: 'sarah.moyo@example.com',
          client_phone: '071 987 6543',
          status: 'approved',
          notes: 'Viewing confirmed for next week',
        },
        {
          property_id: propsData[0].id,
          client_name: 'Robert Mukwenye',
          client_email: 'robert@example.com',
          client_phone: '072 555 1234',
          status: 'pending',
          notes: 'May bring family for viewing',
        },
      ];

      const { error: reqError } = await supabase
        .from('viewing_requests')
        .insert(requests);

      if (reqError) throw reqError;
    }

    console.log('Demo data seeded successfully!');
    return true;
  } catch (error) {
    console.error('Error seeding demo data:', error);
    throw error;
  }
};

export const seedTestUser = async (email: string, password: string) => {
  try {
    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') throw checkError;

    if (existingUser) {
      console.log('Test user already exists');
      return { user_id: existingUser.id, email, password };
    }

    // Sign up new test user
    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) throw signupError;

    if (data.user) {
      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            email,
            full_name: 'Demo User',
            role: 'premium',
          },
        ]);

      if (profileError) throw profileError;

      // Create wallet
      const { error: walletError } = await supabase
        .from('wallet')
        .insert([
          {
            user_id: data.user.id,
            balance: 500,
          },
        ]);

      if (walletError) throw walletError;

      // Create subscription
      const { error: subError } = await supabase
        .from('subscriptions')
        .insert([
          {
            user_id: data.user.id,
            plan: 'premium',
            status: 'active',
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ]);

      if (subError) throw subError;

      // Seed demo data
      await seedDemoData(data.user.id);

      console.log('Test user created successfully!');
      return { user_id: data.user.id, email, password };
    }
  } catch (error) {
    console.error('Error seeding test user:', error);
    throw error;
  }
};
