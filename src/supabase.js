import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nwsbzpcqcoubgvgbrqlf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53c2J6cGNxY291Ymd2Z2JycWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NzQ0OTYsImV4cCI6MjA5NTA1MDQ5Nn0.NcQPwwKVcmhYKOGcSOIFTKLRVMfbesebRlgG9-b57Sc'

export const supabase = createClient(supabaseUrl, supabaseKey)