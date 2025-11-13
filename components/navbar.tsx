import Link from 'next/link'
import {LogOutIcon, UserIcon} from 'lucide-react'
import {ThemeToggle} from "@/components/theme-toggle";
import {Logo} from "@/components/logo";
import {auth, signOut} from "@/auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";

export default async function Navbar() {
    const session = await auth();
    const getUserInitials = (name?: string | null) => {
        if (!name) return 'U';
        name = name.split('@')[0]
        return name.split('.').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <nav
            className="fixed w-full z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-zinc-200/30 dark:border-zinc-800/30 shadow-lg dark:shadow-zinc-900/20">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between  h-16">

                    <Link href="/" className="flex items-center">
                        <Logo/>
                    </Link>

                    {/* Desktop Navigation - Extreme Right */}
                    <div className="hidden md:flex items-center space-x-6">
                        <ThemeToggle/>

                        {session?.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="flex items-center justify-between w-40 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                                        <div
                                            className="h-6 w-6  rounded-full flex items-center justify-center  p-3 text-xs font-medium bg-black dark:bg-white dark:text-black">
                                            {getUserInitials(session.user.name)}
                                        </div>
                                        <span
                                            className=" text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate">
                                            {session.user.name?.split('@')[0] || 'User'}
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="shadow-xl">
                                    <DropdownMenuLabel className="font-medium">
                                        {session.user.email}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>
                                        <Link href="/about" className="flex items-center cursor-pointer">
                                            <UserIcon className="mr-2 h-4 w-4"/>
                                            <span>About</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem asChild>
                                        <form
                                            action={async () => {
                                                "use server";
                                                await signOut({redirectTo: "/login"});
                                            }}
                                            className="w-full"
                                        >
                                            <button
                                                type="submit"
                                                className="flex items-center w-full cursor-pointer text-red-600 dark:text-red-400"
                                            >
                                                <LogOutIcon className="mr-2 h-4 w-4"/>
                                                <span>Sign out</span>
                                            </button>
                                        </form>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <span>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-md transition-colors text-sm font-medium"
                                >
                                    Sign In
                                </Link>
                            </span>
                        )}
                    </div>

                    {/* Mobile Navigation - Extreme Right */}
                    <div className="md:hidden flex items-center space-x-3">
                        <ThemeToggle/>

                        {session?.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                                        <div
                                            className="h-6 w-6 bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-300 rounded-full flex items-center justify-center text-white dark:text-black text-xs font-medium">
                                            {getUserInitials(session.user.name)}
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className=" shadow-xl">
                                    <DropdownMenuLabel className="font-medium">
                                        {session.user.email}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>
                                        <Link href="/about" className="flex items-center cursor-pointer">
                                            <UserIcon className="mr-2 h-4 w-4"/>
                                            <span>About</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem asChild>
                                        <form
                                            action={async () => {
                                                "use server";
                                                await signOut({redirectTo: "/login"});
                                            }}
                                            className="w-full"
                                        >
                                            <button
                                                type="submit"
                                                className="flex items-center w-full cursor-pointer text-red-600 dark:text-red-400"
                                            >
                                                <LogOutIcon className="mr-2 h-4 w-4"/>
                                                <span>Sign out</span>
                                            </button>
                                        </form>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link
                                href="/login"
                                className="px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-md transition-colors text-sm font-medium"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}