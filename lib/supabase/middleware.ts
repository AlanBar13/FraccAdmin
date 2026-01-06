import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { rootDomain } from "../utils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function extractSubdomain(request: NextRequest): string | null {
    const url = request.url;
    const host = request.headers.get("host") || "";
    const hostname = host.split(':')[0];

    // Local development environment
    if (url.includes("localhost") || url.includes("127.0.0.1")) {
        const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
        if (fullUrlMatch && fullUrlMatch[1]) {
            return fullUrlMatch[1];
        }

        if (hostname.includes('.localhost')) {
            return hostname.split('.')[0];
        }

        return null;
    }

    // Production environment
    const rootDomainFormatted = rootDomain.split(':')[0];
    if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
        const parts = hostname.split('---');
        return parts.length > 0 ? parts[0] : null;
    }

    const isSubdomain =
        hostname !== rootDomainFormatted &&
        hostname !== `www.${rootDomainFormatted}` &&
        hostname.endsWith(`.${rootDomainFormatted}`);

    return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

async function handleUnauthenticatedUser(request: NextRequest, subdomain: string | null, supabaseResponse: NextResponse) {
    const { pathname } = request.nextUrl;

    // If trying to access admin routes, redirect to login
    if (pathname.startsWith('/admin')) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // If on a subdomain and not accessing public auth pages, redirect to login
    if (subdomain && !pathname.startsWith('/login') && !pathname.startsWith('/signup')) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        const newResponse = NextResponse.redirect(url)
        supabaseResponse.cookies.getAll().forEach((cookie) => {
            newResponse.cookies.set(cookie)
        })
        return newResponse
    }

    // Allow access to public pages (login, signup) on subdomain
    if (subdomain) {
        const url = request.nextUrl.clone()
        url.pathname = `/s/${subdomain}${pathname}`
        const newResponse = NextResponse.rewrite(url)
        supabaseResponse.cookies.getAll().forEach((cookie) => {
            newResponse.cookies.set(cookie)
        })
        return newResponse
    }

    return supabaseResponse;
}

async function handleAuthenticatedUser(request: NextRequest, user: any, subdomain: string | null, supabaseResponse: NextResponse) {
    const { pathname } = request.nextUrl;
    const role = user.user_metadata.role;

    // Superadmin logic
    if (role === 'superadmin') {
        // Allow access to /admin from anywhere
        if (pathname.startsWith('/admin')) {
            return supabaseResponse;
        }

        // Redirect root / to /admin ONLY if on root domain
        if (!subdomain && pathname === '/') {
            const url = request.nextUrl.clone()
            url.pathname = '/admin'
            return NextResponse.redirect(url)
        }
    }

    // Tenant User/Admin (or Superadmin on subdomain) trying to access their subdomain
    if (subdomain) {
        const url = request.nextUrl.clone()
        url.pathname = `/s/${subdomain}${pathname}`

        const newResponse = NextResponse.rewrite(url)
        supabaseResponse.cookies.getAll().forEach((cookie) => {
            newResponse.cookies.set(cookie)
        })
        return newResponse
    }

    return supabaseResponse;
}

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })
    const subdomain = extractSubdomain(request)

    const supabase = createServerClient(
        supabaseUrl!,
        supabaseKey!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value }) => supabaseResponse.cookies.set(name, value))
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return handleUnauthenticatedUser(request, subdomain, supabaseResponse);
    } else {
        return handleAuthenticatedUser(request, user, subdomain, supabaseResponse);
    }
}