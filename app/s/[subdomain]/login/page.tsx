import Login from '@/components/Login';
import { SubdomainPageProps } from '../page';
import { getTenant } from '@/lib/functions';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: SubdomainPageProps) {
    const { subdomain } = await params
    const tenant = await getTenant(subdomain)

    return {
        title: tenant ? `${tenant.name} | Iniciar sesión` : 'Iniciar sesión',
        description: tenant ? `Iniciar sesión en ${tenant.name}` : 'Iniciar sesión',
    }
}

export default async function SubdomainLoginPage({ params }: SubdomainPageProps) {
    const { subdomain } = await params
    const tenant = await getTenant(subdomain)

    if (!tenant) {
        notFound()
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Login tenantName={tenant.name} subdomain={subdomain} />
        </div>
    )
}