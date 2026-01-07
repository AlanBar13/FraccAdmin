import { Navbar } from "@/components/Navbar";
import { NavbarWrapper } from "@/components/NavbarWrapper";
import { getTenant } from "@/lib/functions"

export default async function Layout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ subdomain: string }>;
}>) {
    const { subdomain } = await params
    const tenant = await getTenant(subdomain)
    return (
        <>
            <NavbarWrapper>
                <Navbar fraccName={tenant?.name} />
            </NavbarWrapper>
            <main className="min-h-screen p-4">
                {children}
            </main>
        </>
    );
}