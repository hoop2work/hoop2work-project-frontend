import { useRouter } from "next/router";
import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type HomeNavbarProps = {
        isLoggedIn: boolean;
};

export default function HomeNavbar({ isLoggedIn }: HomeNavbarProps) {
        const router = useRouter();
        const [successMessage, setSuccessMessage] = useState("");
        

        const handleLogout = () => {
                localStorage.removeItem("token");
                setSuccessMessage("You have been logged out.");
                setTimeout(() => {
                        window.location.reload();
                }, 750);
        };

        const navLink = (
                label: string,
                path: string,
                extra?: string
        ) => (
                <div
                        key={label}
                        onClick={() => router.push(path)}
                        className={`relative text-base cursor-pointer transition font-${router.pathname === path ? "semibold" : "normal"} text-gray-900 ${extra ?? ""}`}
                >
                        {label}
                        {router.pathname === path && (
                                <div className="absolute left-[15%] bottom-[-4px] h-0.5 w-[70%] bg-blue-500 rounded" />
                        )}
                </div>
        );

        return (<>
                <nav className="flex items-center justify-between px-10 py-5 border-b border-black">
                        <div className="text-2xl font-semibold tracking-wide">Hoop2Work</div>
                        <div className="flex gap-6 items-center">
                                {navLink("Home", "/")}
                                {navLink("Trips", "/trips", "font-indie")}
                                {isLoggedIn && (
                                        <>
                                                {navLink("bookings", "/bookings", "font-indie")}
                                                {navLink("Team", "/team", "font-indie")}
                                                {navLink("Costs", "/costs", "font-indie")}
                                        </>
                                )}
                        </div>
                       
                        {isLoggedIn ? (
                                <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                                <div
                                                        className="w-8 h-8 rounded-full bg-blue-200 border border-blue-500 cursor-pointer flex items-center justify-center"
                                                        title="Profil"
                                                />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => router.push('/settings')}>Settings</DropdownMenuItem>
                                                <DropdownMenuItem>.</DropdownMenuItem>
                                                <DropdownMenuItem>.</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                        </DropdownMenuContent>
                                </DropdownMenu>
                        ) : (
                                <div
                                        onClick={() => router.push("/login")}
                                        className="text-base text-gray-900 cursor-pointer"
                                >
                                        Login
                                </div>
                        )}
                        
                </nav>
                 <div className="flex absolute top-0 p-4 justify-center w-full">
                                {successMessage && (
                                        <Alert className="py-1.5 px-4 rounded-lg text-sm min-w-[180px] max-w-[320px] shadow-md">
                                                <Terminal className="h-4 w-4" />
                                                <AlertTitle className="text-base">Success</AlertTitle>
                                                <AlertDescription>{successMessage}</AlertDescription>
                                        </Alert>
                                )}
                        </div>
                </>
        );
}
