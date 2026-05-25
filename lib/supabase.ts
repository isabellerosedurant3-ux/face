import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  nom: string;
  points_solde: number;
  plan_actuel: string;
  date_expiration: string | null;
  created_at: string;
};

export type Plan = {
  id: string;
  nom: string;
  duree_jours: number;
  points: number;
  prix: number;
  qualite: string;
  description: string;
  populaire: boolean;
};

export type Transaction = {
  id: string;
  user_id: string;
  plan_id: string;
  montant: number;
  points_ajoutes: number;
  statut: string;
  paydunya_token: string;
  created_at: string;
};
