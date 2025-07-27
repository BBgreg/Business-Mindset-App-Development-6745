import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pbmydonmjmmwlufboeka.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBibXlkb25tam1td2x1ZmJvZWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2NTUyMDQsImV4cCI6MjA2OTIzMTIwNH0.pBD_vX_TLZXUw-DQuOAk6N-lLEChp-s3t5ojuLHVoDU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

export default supabase