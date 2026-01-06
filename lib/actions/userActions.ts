"use server"

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/login');
}

export async function login(email: string, password: string) {
    let redirectUrl: string | null = null;
    try {
        if (!email || !password) {
            throw new Error('Email and password are required')
        }

        const supabase = await createClient();

        const { error, data: { user } } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            throw error
        }

        if (!user) {
            throw new Error('User not found')
        }

        const role = user.user_metadata.role;
        const tenantId = user.user_metadata.tenant_id;

        revalidatePath("/", 'layout')

        if (role === 'superadmin') {
            redirectUrl = '/admin'
        } else if (tenantId) {
            // Fetch tenant subdomain to redirect correctly
            const { data: tenant } = await supabase.from('tenants').select('subdomain').eq('id', tenantId).single();
            if (tenant && tenant.subdomain) {
                const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
                const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';

                redirectUrl = `${protocol}://${tenant.subdomain}.${rootDomain}`
            } else {
                redirectUrl = '/' // Fallback
            }
        } else {
            redirectUrl = '/' // Fallback for users without role/tenant
        }

    } catch (error) {
        console.log(error)
    }

    if (redirectUrl) {
        redirect(redirectUrl)
    }
}

export async function signupWithTenant(email: string, password: string, tenantId: number) {
    let redirectUrl: string | null = null;
    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    tenant_id: tenantId,
                    role: 'user'
                }
            }
        })

        if (error) {
            throw error
        }

        // Fetch tenant subdomain for redirect
        const { data: tenant } = await supabase.from('tenants').select('subdomain').eq('id', tenantId).single();

        if (tenant && tenant.subdomain) {
            const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
            const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
            redirectUrl = `${protocol}://${tenant.subdomain}.${rootDomain}`
        } else {
            redirectUrl = '/'
        }

    } catch (error) {
        console.log(error)
    }

    if (redirectUrl) {
        redirect(redirectUrl)
    }
}