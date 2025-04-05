import { useState, useEffect } from "react";
import Form from "./components/Form";
import Posts from "./components/Posts";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const addPost = (post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  useEffect(() => {
    setIsLoading(true);
    setFetchError("");

    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("error fetching posts:", error);
        setFetchError("Hiba a bejegyzések betöltésekor");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto py-4 px-4 max-w-xl md:px-0 md:w-1/2">
      <Form addPost={addPost} />

      {isLoading && (
        <div className="text-center">
          <p>Bejegyzések betöltése...</p>
        </div>
      )}

      {fetchError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-5 rounded relative mb-4">
          <p>{fetchError}</p>
          <button
            className="absolute top-0 right-0 px-4 py-3"
            onClick={() => {
              setFetchError("");
              setIsLoading(true);
              fetch("/api/posts")
                .then((response) => response.json())
                .then((data) => {
                  setPosts(data);
                  setIsLoading(false);
                })
                .catch((error) => {
                  console.error("error fetching posts:", error);
                  setFetchError("Hiba a bejegyzések betöltésekor");
                  setIsLoading(false);
                });
            }}
          >
            Újrapróbálkozás
          </button>
        </div>
      )}

      {!isLoading && !fetchError && <Posts posts={posts} />}
    </div>
  );
}
