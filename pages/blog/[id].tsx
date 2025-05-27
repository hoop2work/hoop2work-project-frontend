import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Blogbeitrag {id}</h1>
      <p>Dies ist der Inhalt von Beitrag {id}.</p>
    </div>
  );
}