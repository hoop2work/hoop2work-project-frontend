import HomeNavbar from "@/components/HomeNavbarModelComponent/HomeNavbarModalComponent";
import Footer from "@/components/FooterModelComponent/FooterModelComponent";
import DiaShowComponent from "@/components/DiaShowComponent/DiaShowComponent";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getUserData } from "../ApiClient/ApiClient";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setIsLoggedIn(!!token);

    if (token) {
      (async () => {
        try {
          const data = await getUserData();
          setUsername(data?.username);
        } catch (error) {
          console.error("Failed to get user data:", error);
        }
      })();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <HomeNavbar isLoggedIn={isLoggedIn} />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {isLoggedIn ? (
          <>
            <h2 className="text-4xl font-bold text-indigo-800 mb-10">
              Willkommen {username || "Username"}!
            </h2>
            <DiaShowComponent />
          </>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-indigo-500 mb-8 text-center tracking-wide drop-shadow-lg">
              Your Trip. Your Meeting.{" "}
              <span className="text-indigo-800">Our Mission.</span>
            </h2>
            <DiaShowComponent />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
