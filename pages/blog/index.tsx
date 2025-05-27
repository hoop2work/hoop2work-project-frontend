import Link from 'next/link';

export default function BlogIndex() {
  const posts = [
    { id: '1', title: 'Erster Beitrag' },
    { id: '2', title: 'Zweiter Beitrag' }
  ];

  return (
    <div>
      <h1>Blog Übersicht</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}