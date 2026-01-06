import { Navbar } from "@/components/Navbar";
import { NavbarWrapper } from "@/components/NavbarWrapper";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavbarWrapper>
                <Navbar />
            </NavbarWrapper>
            <main className="min-h-screen p-4">
                {children}
            </main>
        </>
    );
}