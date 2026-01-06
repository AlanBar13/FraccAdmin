"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/actions/userActions"

interface UserNavProps {
    user: {
        email?: string
        user_metadata?: {
            avatar_url?: string
            full_name?: string
        }
    } | null
}

export function UserNav({ user }: UserNavProps) {
    if (!user) {
        return (
            <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                    <a href="/login">Log in</a>
                </Button>
                <Button asChild>
                    <a href="/signup">Sign up</a>
                </Button>
            </div>
        )
    }

    const initials = user.email
        ? user.email.substring(0, 2).toUpperCase()
        : "U"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem disabled>
                        Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        Configuración
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
