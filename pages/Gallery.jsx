import PostCard from "../components/PostCard";

export default function Gallery() {
  // Simulación de posts
  const posts = [
    { id: 1, title: "Amanecer", image: "/img1.jpg" },
    { id: 2, title: "Naturaleza", image: "/img2.jpg" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
