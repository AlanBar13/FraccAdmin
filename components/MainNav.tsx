"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface MainNavProps {
    className?: string
    role?: string
}

export function MainNav({ className, role }: MainNavProps) {
    const pathname = usePathname()

    const links = [
        {
            title: "Anuncios",
            href: "/anuncios",
            roles: ["user", "admin", "superadmin"],
        },
        {
            title: "Casa",
            href: "/casa",
            roles: ["user", "admin", "superadmin"],
        },
        {
            title: "Documentos",
            href: "/documentos",
            roles: ["user", "admin", "superadmin"],
        },
        {
            title: "Pagos",
            href: "/pagos",
            roles: ["user", "admin", "superadmin"],
        },
        {
            title: "Gestionar",
            href: "/gestionar",
            roles: ["admin", "superadmin"],
        },
    ]

    return (
        <div className={cn("hidden md:flex", className)}>
            <NavigationMenu>
                <NavigationMenuList>
                    {links.map((link) => {
                        if (role && !link.roles.includes(role)) return null
                        return (
                            <NavigationMenuItem key={link.title}>
                                <NavigationMenuLink
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        pathname === link.href && "bg-accent text-accent-foreground"
                                    )}
                                    href={link.href}
                                >
                                    {link.title}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        )
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
