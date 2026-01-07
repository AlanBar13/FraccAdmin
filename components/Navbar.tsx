import { MainNav } from "./MainNav"
import { MobileNav } from "./MobileNav"
import { UserNav } from "./UserNav"
import { getUserData } from "@/lib/functions"

interface Props {
    fraccName: string | undefined
}
export async function Navbar({ fraccName }: Props) {
    const response = await getUserData();
    const user = response.user;
    const role = user?.user_metadata?.role;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4">
                <MobileNav role={role} />
                <div className="mr-4 hidden md:flex">
                    <a href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            {fraccName ?? "Fracc"}
                        </span>
                    </a>
                    <MainNav role={role} />
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search or other items can go here */}
                    </div>
                    <UserNav user={user} />
                </div>
            </div>
        </header>
    )
}
