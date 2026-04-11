/*
  # Add Email Verification Status to Profiles

  1. Schema Changes
    - Add `email_verified` boolean column to profiles table (default: false)
    - Add `verified_at` timestamp column

  2. Purpose
    - Track whether user has verified their email
    - Record when verification occurred
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'email_verified'
  ) THEN
    ALTER TABLE profiles ADD COLUMN email_verified boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'verified_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN verified_at timestamptz;
  END IF;
END $$;
