import Signup from '@/components/Signup';
import { SubdomainPageProps } from '../page';
import { getTenant } from '@/lib/functions';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: SubdomainPageProps) {
    const { subdomain } = await params
    const tenant = await getTenant(subdomain)

    return {
        title: tenant ? `${tenant.name} | Registrarse` : 'Registrarse',
        description: tenant ? `Registrarse en ${tenant.name}` : 'Registrarse',
    }
}

export default async function SubdomainSignupPage({ params }: SubdomainPageProps) {
    const { subdomain } = await params
    const tenant = await getTenant(subdomain)

    if (!tenant) {
        notFound()
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Signup tenantName={tenant.name} tenantId={tenant.id} />
        </div>
    )
}
