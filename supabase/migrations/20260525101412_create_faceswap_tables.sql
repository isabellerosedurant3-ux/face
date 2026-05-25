/*
  # FaceSwap Live - Database Schema

  ## Tables Created

  ### 1. profiles
  - Extends auth.users with app-specific data
  - `id` (uuid, FK to auth.users)
  - `email` (text)
  - `nom` (text, display name)
  - `points_solde` (integer, current balance)
  - `plan_actuel` (text, current plan name)
  - `date_expiration` (timestamptz, plan expiration)
  - `created_at` (timestamptz)

  ### 2. plans
  - Subscription plans configuration
  - `id` (text, plan slug like 'starter')
  - `nom` (text, display name)
  - `duree_jours` (integer, duration in days)
  - `points` (integer, points granted)
  - `prix` (numeric, price in XOF/FCFA)
  - `qualite` (text, quality level)
  - `description` (text)
  - `populaire` (boolean, highlight badge)

  ### 3. transactions
  - Payment history
  - `id` (uuid)
  - `user_id` (uuid, FK to profiles)
  - `plan_id` (text, FK to plans)
  - `montant` (numeric)
  - `points_ajoutes` (integer)
  - `statut` (text: pending/completed/failed)
  - `paydunya_token` (text, payment token)
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Users can only read/update their own profile
  - Users can only read their own transactions
  - Plans are publicly readable
*/

-- =====================
-- TABLE: profiles
-- =====================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL DEFAULT '',
  nom text NOT NULL DEFAULT '',
  points_solde integer NOT NULL DEFAULT 0,
  plan_actuel text NOT NULL DEFAULT '',
  date_expiration timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- =====================
-- TABLE: plans
-- =====================
CREATE TABLE IF NOT EXISTS plans (
  id text PRIMARY KEY,
  nom text NOT NULL DEFAULT '',
  duree_jours integer NOT NULL DEFAULT 30,
  points integer NOT NULL DEFAULT 0,
  prix numeric NOT NULL DEFAULT 0,
  qualite text NOT NULL DEFAULT 'HD 1080p',
  description text NOT NULL DEFAULT '',
  populaire boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Plans are publicly readable"
  ON plans FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed initial plans data
INSERT INTO plans (id, nom, duree_jours, points, prix, qualite, description, populaire) VALUES
  ('starter', 'STARTER', 1, 500, 2500, 'HD 1080p', '500 points · 4 min 10 sec · Valable 24h', false),
  ('popular', 'POPULAR', 30, 6000, 9900, 'HD 1080p', '6 000 points · 50 minutes · Support prioritaire', true),
  ('pro', 'PRO', 90, 16000, 24900, '4K Ultra HD', '16 000 points · 133 minutes · Support prioritaire', false),
  ('ultimate', 'ULTIMATE', 365, 45000, 59900, '4K Ultra HD', '45 000 points · 375 minutes · Support VIP 24/7', false)
ON CONFLICT (id) DO NOTHING;

-- =====================
-- TABLE: transactions
-- =====================
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id text NOT NULL REFERENCES plans(id),
  montant numeric NOT NULL DEFAULT 0,
  points_ajoutes integer NOT NULL DEFAULT 0,
  statut text NOT NULL DEFAULT 'pending',
  paydunya_token text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nom)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
