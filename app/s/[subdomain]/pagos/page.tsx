import { getTenant } from "@/lib/functions"
import { SubdomainPageProps } from "../page"

export async function generateMetadata({ params }: SubdomainPageProps) {
    const { subdomain } = await params
    const tenant = await getTenant(subdomain)

    return {
        title: tenant ? `${tenant.name} | Pagos` : 'Pagos',
        description: tenant ? `Pagos de ${tenant.name}` : 'Pagos',
    }
}

export default function PagosPage() {
    return (
        <div>
            <h1>Pagos</h1>
        </div>
    )
}