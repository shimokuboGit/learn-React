import { createClient } from "@supabase/supabase-js"
import { Database } from "../database.types"

export const useSupabaseClient = () => {

  const supabaseClient = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_KEY!
  )

  return { supabaseClient }
}