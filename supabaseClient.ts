
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ekyteohbmclrojycsmcx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVreXRlb2hibWNscm9qeWNzbWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MTc2MDEsImV4cCI6MjA4MDQ5MzYwMX0.gEfNkfn8X5ktfr8JIOmOBduslbFZuJdnAYbJ-o4zGhQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
