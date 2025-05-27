import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Willkommen bei Hoop2Work</h1>
      <p>Hier ist deine zentrale Einstiegsseite.</p>
      <ul>
            <li>
                <Link href="/blog">Zum Blog</Link>
            </li>
            <li>
            <   Link href="/about">Zu About</Link>
            </li>
        </ul>
    </div>
  );
}