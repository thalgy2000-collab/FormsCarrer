import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance = null;

try {
  if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn('Supabase URL is missing or invalid (must start with http/https). Database inserts will be skipped.');
  }
} catch (e) {
  console.error('Failed to initialize Supabase client:', e);
}

export const supabase = supabaseInstance;
