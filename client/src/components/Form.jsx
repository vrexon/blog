import { useState } from "react";

export default function Form({ addPost }) {
  const [errors, setErrors] = useState({
    username: "",
    title: "",
    content: "",
  });

  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (e) => {
    let isValid = true;
    const newErrors = {
      username: "",
      title: "",
      content: "",
    };

    if (!e.target.username.value) {
      newErrors.username = "A felhasználónév megadása kötelező.";
      isValid = false;
    }

    if (!e.target.title.value) {
      newErrors.title = "A cím megadása kötelező.";
      isValid = false;
    }

    if (!e.target.content.value) {
      newErrors.content = "A bejegyzés megadása kötelező.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleForm = (e) => {
    e.preventDefault();

    if (!validateForm(e)) return;

    setSubmitError("");
    setIsSubmitting(true);

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

        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setSubmitError("Hiba történt a bejegyzés közzétételekor.");
        setIsSubmitting(false);
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
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username}</p>
        )}
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
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
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
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-500">{errors.content}</p>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        {submitError && (
          <div className="mr-2 my-auto text-red-500 text-sm">{submitError}</div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-md ${
            isSubmitting ? "bg-gray-400" : "bg-gray-600 hover:bg-gray-500"
          } px-3 py-2 text-sm font-semibold text-white`}
        >
          {isSubmitting ? "Folyamatban..." : "Publikálás"}
        </button>
      </div>
    </form>
  );
}
