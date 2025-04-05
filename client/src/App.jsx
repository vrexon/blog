import { useState, useEffect } from "react";
import Form from "./components/Form";
import Posts from "./components/Posts";

export default function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("error fetching posts:", error);
      });
  }, []);

  return (
    <div className="mx-auto py-4 px-4 max-w-xl md:px-0 md:w-1/2">
      <Form addPost={addPost} />
      <Posts posts={posts} />
    </div>
  );
}
