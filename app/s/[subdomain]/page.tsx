import { Button } from "@/components/ui/button"
import { getTenant } from "@/lib/functions"
import { logout } from "@/lib/actions/userActions"
import { notFound } from "next/navigation"

export type SubdomainPageProps = {
    params: Promise<{ subdomain: string }>
}

export async function generateMetadata({ params }: SubdomainPageProps) {
    const { subdomain } = await params
    const tenant = await getTenant(subdomain)

    return {
        title: tenant ? `${tenant.name} | Inicio` : 'Inicio',
        description: tenant ? `Inicio de ${tenant.name}` : 'Inicio',
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