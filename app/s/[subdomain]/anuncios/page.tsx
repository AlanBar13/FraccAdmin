import { getTenant } from "@/lib/functions"
import { SubdomainPageProps } from "../page"

export async function generateMetadata({ params }: SubdomainPageProps) {
    const { subdomain } = await params
    const tenant = await getTenant(subdomain)

    return {
        title: tenant ? `${tenant.name} | Anuncios` : 'Anuncios',
        description: tenant ? `Anuncios de ${tenant.name}` : 'Anuncios',
    }
}

export default function AnunciosPage() {
    return (
        <div>
            <h1>Anuncios</h1>
        </div>
    )
}