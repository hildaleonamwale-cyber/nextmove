-- Create agencies table
CREATE TABLE IF NOT EXISTS public.agencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'basic' CHECK (role IN ('admin', 'premium', 'worker', 'basic')),
    agency_id UUID REFERENCES public.agencies(id) ON DELETE SET NULL,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    plan_type TEXT
);

-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL,
    subtype TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'available',
    agent_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    agency_id UUID REFERENCES public.agencies(id) ON DELETE SET NULL,
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create viewing_requests table
CREATE TABLE IF NOT EXISTS public.viewing_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    requester_name TEXT NOT NULL,
    requester_email TEXT NOT NULL,
    agent_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    requested_date TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create wallet table
CREATE TABLE IF NOT EXISTS public.wallet (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    balance NUMERIC NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'USD'
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.viewing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet ENABLE ROW LEVEL SECURITY;

-- Create basic policies (you can refine these later based on your exact security needs)

-- Agencies: anyone can read
CREATE POLICY "Agencies are viewable by everyone" ON public.agencies FOR SELECT USING (true);

-- Users: users can read their own profile, and properties can join against agent info
CREATE POLICY "Users are viewable by everyone" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Properties: anyone can read, agents can insert/update/delete their own
CREATE POLICY "Properties are viewable by everyone" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Agents can insert their own properties" ON public.properties FOR INSERT WITH CHECK (auth.uid() = agent_id);
CREATE POLICY "Agents can update their own properties" ON public.properties FOR UPDATE USING (auth.uid() = agent_id);
CREATE POLICY "Agents can delete their own properties" ON public.properties FOR DELETE USING (auth.uid() = agent_id);

-- Viewing Requests: agents can see requests for their properties, anyone can insert
CREATE POLICY "Anyone can insert viewing requests" ON public.viewing_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Agents can view requests for their properties" ON public.viewing_requests FOR SELECT USING (auth.uid() = agent_id);
CREATE POLICY "Agents can update requests for their properties" ON public.viewing_requests FOR UPDATE USING (auth.uid() = agent_id);

-- Notifications: users can see and update their own
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can insert notifications" ON public.notifications FOR INSERT WITH CHECK (true);

-- Wallet: users can see their own wallet
CREATE POLICY "Users can view own wallet" ON public.wallet FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own wallet" ON public.wallet FOR UPDATE USING (auth.uid() = user_id);

-- Create a trigger to automatically create a user profile and wallet when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (new.id, new.email, 'basic');
  
  INSERT INTO public.wallet (user_id, balance)
  VALUES (new.id, 0);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Optional: Insert some dummy agencies
INSERT INTO public.agencies (id, name, description)
VALUES 
  (gen_random_uuid(), 'Willow & Elm', 'Premium real estate agency'),
  (gen_random_uuid(), 'Pam Golding', 'International property group')
ON CONFLICT DO NOTHING;
