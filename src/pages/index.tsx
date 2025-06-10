import Link from 'next/link';
import HomeNavbar from '@/components/HomeNavbarModelComponent/HomeNavbarModalComponent';
import Footer from '@/components/FooterModelComponent/FooterModelComponent';
import DiaShowComponent from '@/components/DiaShowComponent/DiaShowComponent';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Hier kannst du die Login-Logik einbauen, z.B. Token im LocalStorage prüfen
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      <Head>
        <title>Trips - Hoop2Work</title>
        <meta name="description" content="Trips page" />
      </Head>
      <HomeNavbar isLoggedIn={isLoggedIn} />
      {isLoggedIn ? (
        <>
          <h2>Willkommen Username</h2>
          <DiaShowComponent />
        </>
      ) : (
        <>
          <p>Your Trip. Your Meeting. Our Mission.</p>
          <DiaShowComponent />
        </>
      )}
      <Footer />
    </div>
  );
}