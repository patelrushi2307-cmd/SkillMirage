import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || ''; // Ideally we'd use service role key for admin tasks, but for auth checking anon is fine.

export const supabase = createClient(supabaseUrl, supabaseKey);
