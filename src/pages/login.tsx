import { loginUser } from "@/ApiClient/Auth";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const result = await loginUser(username, password);
        alert("Login erfolgreich!");
        router.push("/");
    } catch (error: any) {
        alert(`Login fehlgeschlagen: ${error.message}`);
    }
};

    return (
        <>
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "'Indie Flower', cursive, sans-serif",
                padding: "20px 40px",
                paddingBottom: "20px",
            }}
        >
            <div style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: 1 }}>
                Hoop2Work
            </div>
        </nav>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
        }}>
            <div style={{
                width: 320,
                padding: 24,
                borderRadius: 18,
                border: "2px solid #222",
                boxShadow: "2px 2px 0 #222",
                background: "#fff",
                fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
                boxSizing: "border-box"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                    <div>
                        <h1 style={{
                            margin: 0,
                            fontWeight: 700,
                            fontSize: 32,
                            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive"
                        }}>Login</h1>
                        <div style={{
                            fontSize: 20,
                            marginBottom: 18,
                            marginTop: 2
                        }}>Full text</div>
                    </div>
                    <button
                        aria-label="Close"
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: 30,
                            cursor: "pointer",
                            marginTop: 4
                        }}
                        onClick={() => router.push("/")}
                    >×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "8px 12px",
                            marginBottom: 12,
                            borderRadius: 8,
                            border: "2px solid #888",
                            fontSize: 18,
                            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive"
                        }} />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "8px 12px",
                            marginBottom: 16,
                            borderRadius: 8,
                            border: "2px solid #888",
                            fontSize: 18,
                            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive"
                        }} />
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "8px 0",
                            borderRadius: 8,
                            border: "2px solid #222",
                            background: "#bfe1ff",
                            color: "#222",
                            fontSize: 20,
                            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
                            fontWeight: 400,
                            cursor: "pointer",
                            marginBottom: 10,
                            boxShadow: "1px 1px 0 #222"
                        }}
                    >
                        Submit
                    </button>
                </form>
                <div style={{ marginTop: 8 }}>
                    <a
                        href="/register"
                        style={{
                            color: "#2196f3",
                            textDecoration: "none",
                            fontSize: 18,
                            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive"
                        }}
                    >
                        &gt; Registration
                    </a>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;