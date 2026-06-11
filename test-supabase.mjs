import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("Testing Supabase connection...");
  
  const { data: categories, error: catError } = await supabase.from('categories').select('*');
  if (catError) {
    console.error("Category fetch error:", catError);
  } else {
    console.log("Categories found:", categories.length);
  }

  const { data: products, error: prodError } = await supabase.from('products').select('*');
  if (prodError) {
    console.error("Products fetch error:", prodError);
  } else {
    console.log("Products found:", products.length);
  }
}

test();
