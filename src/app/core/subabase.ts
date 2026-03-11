import { createClient } from '@supabase/supabase-js';
import { environment } from '../enviroments/environment';

export const supabase = createClient(
  environment.supabaseUrl,
  environment.supabaseKey
);