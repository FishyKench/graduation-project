import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hbgtjdhhhtgyteetvyam.supabase.co/";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZ3RqZGhoaHRneXRlZXR2eWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyOTE2NzEsImV4cCI6MjA1Mzg2NzY3MX0.CAFppOUVhLqLD6Fp44vKYn6MdhgFmgADjdZ8A7oLNTk";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
