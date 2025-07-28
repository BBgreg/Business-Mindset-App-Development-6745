import { createClient } from '@supabase/supabase-js'

// Use the correct Supabase URL and anon key
const supabaseUrl = 'https://pbmydonmjmmwlufboeka.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBibXlkb25tam1td2x1ZmJvZWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2NTUyMDQsImV4cCI6MjA2OTIzMTIwNH0.pBD_vX_TLZXUw-DQuOAk6N-lLEChp-s3t5ojuLHVoDU'

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false // Changed to false to avoid potential URL parsing issues
  }
})

export default supabase