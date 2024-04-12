
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://waowgxsymqmivvqxhson.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indhb3dneHN5bXFtaXZ2cXhoc29uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTAyODUsImV4cCI6MjAyODQ2NjI4NX0.OiYZ1mnPoHdlH2OJuI0Rc6LMaGm2ad5BDWSmHWgVm_E'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;