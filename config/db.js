const superbase = require("@supabase/supabase-js");

const db = superbase.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);

module.exports = {
  db
}
