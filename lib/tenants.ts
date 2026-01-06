import { createClient } from "./supabase/server";
import { cache } from "react";

export const getTenant = cache(async (subdomain: string) => {
    const supabase = await createClient();
    const { data: tenant, error } = await supabase.from('tenants').select('*').eq('subdomain', subdomain).single();
    if (error) {
        console.error(error);
        return null;
    }
    return tenant;
})