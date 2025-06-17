import { useRouter } from "next/router";
import React from "react";

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

        const handleLogout = () => {
                localStorage.removeItem("token");
                alert("You have been logged out.");
                window.location.reload();
        };

        return (
                <nav
                        style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                fontFamily: "'Indie Flower', cursive, sans-serif",
                                padding: "20px 40px",
                                paddingBottom: "20px",
                                borderBottom: "1px solid #000000",
                        }}
                >
                        <div style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: 1 }}>
                                Hoop2Work
                        </div>

                        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                                <div
                                        key="Home"
                                        onClick={() => router.push("/")}
                                        style={{
                                                fontSize: "1rem",
                                                position: "relative",
                                                color: "#222",
                                                fontWeight: router.pathname === "/" ? 600 : 400,
                                                cursor: "pointer",
                                                fontFamily: "'Indie Flower', cursive, sans-serif",
                                        }}
                                >
                                        Home
                                        {router.pathname === "/" && (
                                                <div
                                                        style={{
                                                                height: "2px",
                                                                background: "#2196f3",
                                                                width: "70%",
                                                                position: "absolute",
                                                                left: "15%",
                                                                bottom: -4,
                                                                borderRadius: 2,
                                                        }}
                                                />
                                        )}
                                </div>
                                <div
                                        key="Trips"
                                        onClick={() => router.push("/trips")}
                                        style={{
                                                fontSize: "1rem",
                                                position: "relative",
                                                color: "#222",
                                                fontWeight: router.pathname === "/trips" ? 600 : 400,
                                                cursor: "pointer",
                                                fontFamily: "'Indie Flower', cursive, sans-serif",
                                        }}
                                >
                                        Trips
                                        {router.pathname === "/trips" && (
                                                <div
                                                        style={{
                                                                height: "2px",
                                                                background: "#2196f3",
                                                                width: "70%",
                                                                position: "absolute",
                                                                left: "15%",
                                                                bottom: -4,
                                                                borderRadius: 2,
                                                        }}
                                                />
                                        )}
                                </div>
                                {isLoggedIn && (
                                        <>
                                                <div
                                                        key="Bookings"
                                                        onClick={() => router.push("/bookings")}
                                                        style={{
                                                                fontSize: "1rem",
                                                                position: "relative",
                                                                color: "#222",
                                                                fontWeight: router.pathname === "/bookings" ? 600 : 400,
                                                                cursor: "pointer",
                                                                fontFamily: "'Indie Flower', cursive, sans-serif",
                                                        }}
                                                >
                                                        bookings
                                                        {router.pathname === "/bookings" && (
                                                                <div
                                                                        style={{
                                                                                height: "2px",
                                                                                background: "#2196f3",
                                                                                width: "70%",
                                                                                position: "absolute",
                                                                                left: "15%",
                                                                                bottom: -4,
                                                                                borderRadius: 2,
                                                                        }}
                                                                />
                                                        )}
                                                </div>
                                                <div
                                                        key="Team"
                                                        onClick={() => router.push("/team")}
                                                        style={{
                                                                fontSize: "1rem",
                                                                position: "relative",
                                                                color: "#222",
                                                                fontWeight: router.pathname === "/team" ? 600 : 400,
                                                                cursor: "pointer",
                                                                fontFamily: "'Indie Flower', cursive, sans-serif",
                                                        }}
                                                >
                                                        Team
                                                        {router.pathname === "/team" && (
                                                                <div
                                                                        style={{
                                                                                height: "2px",
                                                                                background: "#2196f3",
                                                                                width: "70%",
                                                                                position: "absolute",
                                                                                left: "15%",
                                                                                bottom: -4,
                                                                                borderRadius: 2,
                                                                        }}
                                                                />
                                                        )}
                                                </div>
                                                <div
                                                        key="Costs"
                                                        onClick={() => router.push("/costs")}
                                                        style={{
                                                                fontSize: "1rem",
                                                                position: "relative",
                                                                color: "#222",
                                                                fontWeight: router.pathname === "/costs" ? 600 : 400,
                                                                cursor: "pointer",
                                                                fontFamily: "'Indie Flower', cursive, sans-serif",
                                                        }}
                                                >
                                                        Costs
                                                        {router.pathname === "/costs" && (
                                                                <div
                                                                        style={{
                                                                                height: "2px",
                                                                                background: "#2196f3",
                                                                                width: "70%",
                                                                                position: "absolute",
                                                                                left: "15%",
                                                                                bottom: -4,
                                                                                borderRadius: 2,
                                                                        }}
                                                                />
                                                        )}
                                                </div>
                                        </>
                                )}
                        </div>

                        {isLoggedIn ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div
                                            style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: "50%",
                                                background: "#90caf9",
                                                border: "1px solid #2196f3",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            title="Profil"
                                        >
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => router.push('/settings')}>Settings</DropdownMenuItem>
                                        <DropdownMenuItem>.</DropdownMenuItem>
                                        <DropdownMenuItem>.</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem 
                                        onClick={handleLogout}>Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                        ) : (
                                <div
                                        onClick={() => router.push("/login")}
                                        style={{
                                                fontSize: "1rem",
                                                fontFamily: "'Indie Flower', cursive, sans-serif",
                                                color: "#222",
                                                cursor: "pointer",
                                        }}
                                >
                                        Login
                                </div>
                        )}
                </nav>
        );
}