export default function Form({ addPost }) {
  const handleForm = (e) => {
    e.preventDefault();
    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        title: e.target.title.value,
        content: e.target.content.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        addPost({
          id: data.id,
          username: data.username,
          title: data.title,
          content: data.content,
          created_at: data.created_at,
        });

        e.target.username.value = "";
        e.target.title.value = "";
        e.target.content.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleForm}>
      <label
        htmlFor="username"
        className="block text-sm font-medium text-gray-900"
      >
        Felhasználónév
      </label>
      <div className="mt-2">
        <input
          id="username"
          name="username"
          type="text"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300"
          maxLength={30}
          required
        />
      </div>

      <label
        htmlFor="title"
        className="block mt-2 text-sm font-medium text-gray-900"
      >
        Cím
      </label>
      <div className="mt-2">
        <input
          id="title"
          name="title"
          type="text"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300"
          maxLength={200}
          required
        />
      </div>

      <label
        htmlFor="content"
        className="block mt-2 text-sm font-medium text-gray-900"
      >
        Bejegyzés
      </label>
      <div className="mt-2">
        <textarea
          id="content"
          name="content"
          rows={3}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300"
          required
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-gray-600 hover:bg-gray-500 px-3 py-2 text-sm font-semibold text-white"
        >
          Publikálás
        </button>
      </div>
    </form>
  );
}
