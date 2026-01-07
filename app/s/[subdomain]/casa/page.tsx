import { getTenant } from "@/lib/functions"
import { SubdomainPageProps } from "../page"

export async function generateMetadata({ params }: SubdomainPageProps) {
    const { subdomain } = await params
    const tenant = await getTenant(subdomain)

    return {
        title: tenant ? `${tenant.name} | Casa` : 'Casa',
        description: tenant ? `Casa de ${tenant.name}` : 'Casa',
    }
}

export default function CasaPage() {
    return (
        <div>
            <h1>Casa</h1>
        </div>
    )
}