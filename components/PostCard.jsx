import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded mb-2" />
      <h3 className="font-semibold mb-1">{post.title}</h3>
      <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline">Ver más</Link>
    </div>
  )
}