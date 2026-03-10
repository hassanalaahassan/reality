import { createClient } from '@supabase/supabase-js';
import { environment } from '../enviroments/environment';

export const supabase = createClient(
  process.env['SUPABASE_URL']!,
  process.env['SUPABASE_KEY']!  
);