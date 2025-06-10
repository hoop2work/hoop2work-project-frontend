import { useRouter } from "next/router";
import React from "react";

const navItems = [
    { name: "Home", active: true },
    { name: "Trips", active: false },
];

type HomeNavbarProps = {
  isLoggedIn: boolean;
};

export default function HomeNavbar({ isLoggedIn }: HomeNavbarProps) {
    const router = useRouter();
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
                {navItems.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => {
                            if (item.name === "Home") {
                                router.push("/");
                            } else if (item.name === "Trips") {
                                router.push("/trips");
                            }
                        }}
                        style={{
                            fontSize: "1rem",
                            position: "relative",
                            color: "#222",
                            fontWeight:
                                (item.name === "Home" && router.pathname === "/") ||
                                (item.name === "Trips" && router.pathname === "/trips")
                                    ? 600
                                    : 400,
                            cursor: "pointer",
                            fontFamily: "'Indie Flower', cursive, sans-serif",
                        }}
                    >
                        {item.name}
                        {((item.name === "Home" && router.pathname === "/") ||
                            (item.name === "Trips" && router.pathname === "/trips")) && (
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
                ))}
            </div>

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
        </nav>
    );
}