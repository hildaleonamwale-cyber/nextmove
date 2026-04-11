/*
  # Create Email Verifications Table

  1. New Tables
    - `email_verifications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `email` (text, the email to verify)
      - `otp` (text, 6-digit code)
      - `attempts` (integer, failed attempts counter)
      - `expires_at` (timestamp, expires in 10 minutes)
      - `verified_at` (timestamp, when verified)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `email_verifications` table
    - Add policy for users to verify their own email only
    - Add policy for authenticated users to create verification records
*/

CREATE TABLE IF NOT EXISTS email_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  otp text NOT NULL,
  attempts integer DEFAULT 0,
  expires_at timestamptz NOT NULL,
  verified_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can verify their own email"
  ON email_verifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own verification record"
  ON email_verifications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own verification record"
  ON email_verifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_email_verifications_user_id ON email_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_email_verifications_expires_at ON email_verifications(expires_at);
