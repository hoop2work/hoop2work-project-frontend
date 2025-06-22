import { loginUser } from "@/ApiClient/Auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim()) {
            setErrorMessage("Bitte geben Sie einen Benutzernamen ein.");
            return;
        }
        if (!password.trim()) {
            setErrorMessage("Bitte geben Sie ein Passwort ein.");
            return;
        }

        try {
            const result = await loginUser(username, password);
            setSuccessMessage("Login erfolgreich!");
            setErrorMessage("");
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } catch (error: any) {
            setErrorMessage(`Login fehlgeschlagen: ${error.message}`);
            setSuccessMessage("");
        }
    };

    return (
        <>
            <nav className="flex items-center justify-between px-10 py-5 pb-5 relative">
                <div className="text-2xl font-semibold tracking-wider">
                    Hoop2Work
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 min-w-[220px] max-w-[320px] z-[1000] flex flex-col items-center gap-2">
                    {successMessage && (
                        <Alert className="py-1.5 px-4 rounded-lg text-sm min-w-[180px] max-w-[320px] shadow-md">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle className="text-base">Success</AlertTitle>
                            <AlertDescription>{successMessage}</AlertDescription>
                        </Alert>
                    )}
                    {errorMessage && (
                        <Alert variant="destructive" className="py-1.5 px-4 rounded-lg text-sm min-w-[180px] max-w-[320px] shadow-md">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle className="text-base">Error</AlertTitle>
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </nav>
            <div className="flex justify-center items-center min-h-[80vh]">
                <div className="w-80 p-6 rounded-2xl border-2 border-black shadow-[2px_2px_0_#222] bg-white box-border">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="m-0 font-bold text-3xl">Login</h1>
                            <div className="text-xl mb-4 mt-0.5">Full text</div>
                        </div>
                        <button
                            aria-label="Close"
                            className="bg-none border-none text-3xl cursor-pointer mt-1"
                            onClick={() => router.push("/")}
                            type="button"
                        >×</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full py-2 px-3 mb-3 rounded-lg border-2 border-gray-500 text-lg"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full py-2 px-3 mb-4 rounded-lg border-2 border-gray-500 text-lg"
                        />
                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg border-2 border-black bg-blue-100 text-black text-xl font-normal cursor-pointer mb-2 shadow-[1px_1px_0_#222]"
                        >
                            Submit
                        </button>
                    </form>
                    <div className="mt-2">
                        <a
                            href="/register"
                            style={{
                            color: "#2196f3",
                            textDecoration: "none",
                            fontSize: 18
                        }}
                        >
                            &gt; Registration
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;