import { createClient } from "@supabase/supabase-js"
import { Database } from "../database.types"

export const useSupabaseClient = () => {

  const supabaseClient = createClient<Database>(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_KEY!
  )

  return { supabaseClient }
}