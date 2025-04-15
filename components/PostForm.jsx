export default function PostForm() {
    return (
      <form className="space-y-4">
        <input type="text" placeholder="Título" className="w-full p-2 border rounded" />
        <textarea placeholder="Descripción" className="w-full p-2 border rounded" />
        <input type="file" className="w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Publicar
        </button>
      </form>
    );
  }
  