import Post from "./Post";

export default function Posts({ posts }) {
  return (
    <>
      <h2 className="text-3xl font-semibold mt-4 text-gray-900">Bejegyzések</h2>
      <div className="flex flex-col mx-auto mt-10 pt-10 gap-y-8 border-t border-gray-200">
        {posts.length === 0 ? (
          <p>Még nincsenek bejegyzések.</p>
        ) : (
          posts.map((post) => <Post key={post.id} post={post} />)
        )}
      </div>
    </>
  );
}
