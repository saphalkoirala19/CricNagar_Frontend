// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://noqcrzxnnkvpuexttuax.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vcWNyenhubmt2cHVleHR0dWF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NDcwNjIsImV4cCI6MjA1ODIyMzA2Mn0.Cj-eLLlBG7-6ilEAF8oUHlsJeMxIBpO76TZ2dmrUl88";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);