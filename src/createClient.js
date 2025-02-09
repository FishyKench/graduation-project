import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hbgtjdhhhtgyteetvyam.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZ3RqZGhoaHRneXRlZXR2eWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyOTE2NzEsImV4cCI6MjA1Mzg2NzY3MX0.CAFppOUVhLqLD6Fp44vKYn6MdhgFmgADjdZ8A7oLNTk";
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true, // Ensure session is stored
    autoRefreshToken: true, // Automatically refresh token
    detectSessionInUrl: true,
  },
});

export default supabase;
