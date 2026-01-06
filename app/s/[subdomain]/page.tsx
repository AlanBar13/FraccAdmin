import { Button } from "@/components/ui/button"
import { getTenant } from "@/lib/tenants"
import { logout } from "@/lib/userActions"
import { notFound } from "next/navigation"

export type SubdomainPageProps = {
    params: Promise<{ subdomain: string }>
}

export async function generateMetadata({ params }: SubdomainPageProps) {
    const { subdomain } = await params
    const tenant = await getTenant(subdomain)

    return {
        title: tenant ? `${subdomain} | Inicio` : 'Inicio',
        description: tenant ? `Inicio de ${subdomain}` : 'Inicio',
    }
}

export default async function SubdomainPage({ params }: SubdomainPageProps) {
    const { subdomain } = await params
    const tenant = await getTenant(subdomain)

    if (!tenant) {
        notFound()
    }

    return (
        <div>
            <h1>Subdomain Page {tenant.name}</h1>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}