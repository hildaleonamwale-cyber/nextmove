import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth functions
export const signUp = async (email: string, password: string, fullName: string, role: string = 'basic') => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  if (data.user) {
    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: data.user.id,
          email,
          full_name: fullName,
          role,
        },
      ]);

    if (profileError) throw profileError;

    // Create wallet
    const { error: walletError } = await supabase
      .from('wallet')
      .insert([
        {
          user_id: data.user.id,
          balance: role === 'basic' ? 0 : role === 'premium' ? 100 : role === 'admin' ? 500 : 0,
        },
      ]);

    if (walletError) throw walletError;

    // Create subscription
    const { error: subError } = await supabase
      .from('subscriptions')
      .insert([
        {
          user_id: data.user.id,
          plan: role,
          status: 'active',
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]);

    if (subError) throw subError;
  }

  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

// Profile functions
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const updateProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

// Property functions
export const getProperties = async (userId: string, role: string) => {
  let query = supabase.from('properties').select('*');

  if (role === 'basic' || role === 'premium') {
    query = query.eq('user_id', userId);
  } else if (role === 'worker') {
    query = query.or(`user_id.eq.${userId},agent_id.eq.${userId}`);
  }
  // admin sees all

  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const createProperty = async (userId: string, property: any) => {
  const { data, error } = await supabase
    .from('properties')
    .insert([{ ...property, user_id: userId }])
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const updateProperty = async (propertyId: string, updates: any) => {
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', propertyId)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const deleteProperty = async (propertyId: string) => {
  const { error } = await supabase.from('properties').delete().eq('id', propertyId);
  if (error) throw error;
};

export const promoteProperty = async (userId: string, propertyId: string, days: number = 30) => {
  const costPerDay = 1;
  const totalCost = days * costPerDay;

  // Create promotion record
  const { data: promoData, error: promoError } = await supabase
    .from('promoted_properties')
    .insert([
      {
        property_id: propertyId,
        user_id: userId,
        end_date: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
        cost_per_day: costPerDay,
        total_cost: totalCost,
      },
    ])
    .select()
    .maybeSingle();

  if (promoError) throw promoError;

  // Deduct from wallet
  const { data: wallet, error: walletError } = await supabase
    .from('wallet')
    .select('balance')
    .eq('user_id', userId)
    .maybeSingle();

  if (walletError) throw walletError;

  const newBalance = (wallet?.balance || 0) - totalCost;

  const { error: updateError } = await supabase
    .from('wallet')
    .update({ balance: newBalance, updated_at: new Date().toISOString() })
    .eq('user_id', userId);

  if (updateError) throw updateError;

  // Record transaction
  const { error: txError } = await supabase.from('transactions').insert([
    {
      user_id: userId,
      wallet_id: wallet?.id,
      amount: -totalCost,
      type: 'sponsorship',
      description: `Promote property for ${days} days`,
      balance_after: newBalance,
      reference_id: promoData?.id,
    },
  ]);

  if (txError) throw txError;

  // Update property to marked as promoted
  await updateProperty(propertyId, { is_promoted: true, promoted_until: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString() });

  return promoData;
};

// Viewing requests
export const getViewingRequests = async (userId: string, role: string) => {
  if (role === 'worker' || role === 'premium' || role === 'basic') {
    const { data, error } = await supabase
      .from('viewing_requests')
      .select(
        `
        *,
        property:properties(title, location, price)
      `
      )
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  const { data, error } = await supabase
    .from('viewing_requests')
    .select(
      `
      *,
      property:properties(title, location, price, user_id)
    `
    )
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const createViewingRequest = async (propertyId: string, clientData: any) => {
  const { data, error } = await supabase
    .from('viewing_requests')
    .insert([{ property_id: propertyId, ...clientData }])
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const updateViewingRequestStatus = async (requestId: string, status: string) => {
  const { data, error } = await supabase
    .from('viewing_requests')
    .update({ status })
    .eq('id', requestId)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

// Wallet functions
export const getWallet = async (userId: string) => {
  const { data, error } = await supabase
    .from('wallet')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const topUpWallet = async (userId: string, amount: number) => {
  const { data: wallet, error: walletError } = await supabase
    .from('wallet')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (walletError) throw walletError;

  const newBalance = (wallet?.balance || 0) + amount;

  const { error: updateError } = await supabase
    .from('wallet')
    .update({ balance: newBalance, last_topup_date: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq('user_id', userId);

  if (updateError) throw updateError;

  // Record transaction
  const { error: txError } = await supabase.from('transactions').insert([
    {
      user_id: userId,
      wallet_id: wallet?.id,
      amount,
      type: 'topup',
      description: `Top up wallet`,
      balance_after: newBalance,
    },
  ]);

  if (txError) throw txError;

  return newBalance;
};

export const getTransactions = async (userId: string) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Subscription functions
export const getSubscription = async (userId: string) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const updateSubscription = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

// Team functions
export const getTeamMembers = async (companyId: string) => {
  const { data, error } = await supabase
    .from('team_members')
    .select(
      `
      *,
      profile:profiles(id, full_name, email, role)
    `
    )
    .eq('company_id', companyId);

  if (error) throw error;
  return data || [];
};

export const addTeamMember = async (companyId: string, userId: string, role: string = 'agent') => {
  const { data, error } = await supabase
    .from('team_members')
    .insert([{ company_id: companyId, user_id: userId, role }])
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const removeTeamMember = async (companyId: string, userId: string) => {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('company_id', companyId)
    .eq('user_id', userId);

  if (error) throw error;
};
