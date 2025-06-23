"use client";

import React, { useEffect, useState } from "react";
import HomeNavbar from "@/components/HomeNavbarModelComponent/HomeNavbarModalComponent";
import Footer from "@/components/FooterModelComponent/FooterModelComponent";
import { Terminal } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";

export default function BookingsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSuccessMessage("You have been logged out.");
    setTimeout(() => {
      window.location.reload();
    }, 750);
  };

  return (
    <>
      <HomeNavbar isLoggedIn={isLoggedIn} />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 min-w-[220px] max-w-[320px] z-[1000] flex flex-col items-center gap-2">
        {successMessage && (
          <Alert className="py-1.5 px-4 rounded-lg text-sm min-w-[180px] max-w-[320px] shadow-md">
            <Terminal className="h-4 w-4" />
            <AlertTitle className="text-base">Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        {errorMessage && (
          <Alert
            variant="destructive"
            className="py-1.5 px-4 rounded-lg text-sm min-w-[180px] max-w-[320px] shadow-md"
          >
            <Terminal className="h-4 w-4" />
            <AlertTitle className="text-base">Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="p-5">
        <h2 className="text-3xl mb-6">Setting&apos;s</h2>
      </div>

      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <p className="mt-6 pb-4 text-muted-foreground text-xl">
          There are no settings available yet.
        </p>
      </div>

      <div className="flex justify-center pb-6">
        <button
          onClick={handleLogout}
          className="bg-red-200 hover:bg-red-300 text-black border border-black text-2xl px-150 py-2 rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      <Footer />
    </>
  );
}
