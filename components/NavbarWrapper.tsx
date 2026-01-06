"use client"

import { usePathname } from "next/navigation"

export function NavbarWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    // Define routes where the Navbar should NOT be displayed
    const hideNavbarRoutes = ["/login", "/signup"]

    // Check if the current pathname ends with any of the hidden routes
    const shouldHide = hideNavbarRoutes.some(route => pathname.endsWith(route))

    if (shouldHide) {
        return null
    }

    return <>{children}</>
}
