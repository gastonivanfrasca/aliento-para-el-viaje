import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.ADMIN_SUP_URL!
const supabaseAnonKey = process.env.ADMIN_SUP_ANON!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)