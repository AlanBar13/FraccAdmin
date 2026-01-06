"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface MobileNavProps {
    role?: string
}

export function MobileNav({ role }: MobileNavProps) {
    const [open, setOpen] = React.useState(false)

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
        <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle className="text-left">Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-4 mt-4">
                        {links.map((link) => {
                            if (role && !link.roles.includes(role)) return null
                            return (
                                <Link
                                    key={link.title}
                                    href={link.href}
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                    onClick={() => setOpen(false)}
                                >
                                    {link.title}
                                </Link>
                            )
                        })}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
