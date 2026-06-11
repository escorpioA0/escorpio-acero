import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://urpetjlobnbewlolqsrg.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVycGV0amxvYm5iZXdsb2xxc3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMjA3NzcsImV4cCI6MjA5NjY5Njc3N30.UQTrO0xHY4Ms7XEFFULyh511o5rltc-YGf9UWtZolGg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
