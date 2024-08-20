import {createClient} from '@supabase/supabase-js'

export const supabaseUrl = 'https://eebgeqqodlxokrhhtvdz.supabase.co'
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlYmdlcXFvZGx4b2tyaGh0dmR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1OTE3MDQsImV4cCI6MjAzNjE2NzcwNH0.j_MBZbMsb_SvVNhnE4iJY9TNJNEmjHmzBce-Ehg_rkg'
export const supabase = createClient(supabaseUrl, supabaseKey)