-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  marketing_consent BOOLEAN DEFAULT FALSE,
  privacy_consent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public waitlist)
CREATE POLICY "Allow public insert to waitlist" 
ON waitlist FOR INSERT 
TO public
WITH CHECK (true);

-- Allow authenticated users (admins) to see the waitlist
-- You might want to restrict this further to specific admin emails
CREATE POLICY "Allow authenticated users to view waitlist" 
ON waitlist FOR SELECT 
TO authenticated 
USING (true);
