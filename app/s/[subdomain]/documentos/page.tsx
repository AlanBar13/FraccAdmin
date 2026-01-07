import { getTenant } from "@/lib/functions"
import { SubdomainPageProps } from "../page"

export async function generateMetadata({ params }: SubdomainPageProps) {
    const { subdomain } = await params
    const tenant = await getTenant(subdomain)

    return {
        title: tenant ? `${tenant.name} | Documentos` : 'Documentos',
        description: tenant ? `Documentos de ${tenant.name}` : 'Documentos',
    }
}

export default function DocumentosPage() {
    return (
        <div>
            <h1>Documentos</h1>
        </div>
    )
}