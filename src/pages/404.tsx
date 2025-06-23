"use client";

import React, { useEffect, useState } from "react";
import HomeNavbar from "@/components/HomeNavbarModelComponent/HomeNavbarModalComponent";
import Footer from "@/components/FooterModelComponent/FooterModelComponent";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";

export default function NotFoundPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <HomeNavbar isLoggedIn={isLoggedIn} />
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <Alert variant="destructive" className="max-w-md w-full">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <div>
            <AlertTitle className="text-xl font-bold">
              404 - Page Not Found
            </AlertTitle>
            <AlertDescription className="mt-2">
              Oops! The page you&apos;re looking for doesn&apos;t exist or has
              been moved.
            </AlertDescription>
          </div>
        </Alert>
        <p className="mt-6 pb-4 text-muted-foreground text-sm">
          Let’s get you back on track.
        </p>
        <Link
          href="/"
          className="bg-blue-200 hover:bg-blue-300 text-black border border-black text-2xl px-30 py-2 rounded-lg shadow"
        >
          Go to Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
