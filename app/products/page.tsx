import { createClient } from "@/lib/supabase-server";
import { ProductsContent } from "./ProductsContent";

export default async function ProductsPage() {
    const supabase = await createClient();

    const { data: products, error } = await supabase
        .from('products')
        .select('*, profiles(full_name, university, avatar_url)')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching products in server component:", error);
    }

    return <ProductsContent initialProducts={products || []} />;
}
