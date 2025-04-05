import { useState } from "react";

export default function Post({ post }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateContent = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <article className="flex flex-col max-w-xl items-start justify-between">
      <div className="text-sm">
        <p className="font-semibold text-gray-900">{post.username}</p>
      </div>
      <time dateTime={post.created_at} className="text-gray-500 text-xs">
        {new Date(post.created_at).toLocaleDateString("hu-HU", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold text-gray-900">
          {post.title}
        </h3>
        <div className="mt-2 text-sm text-gray-600">
          <p>{isExpanded ? post.content : truncateContent(post.content)}</p>
          {post.content.length > 100 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="mt-2 text-gray-600 hover:text-gray-500 font-medium relative z-10 cursor-pointer"
            >
              {isExpanded ? "Kevesebb mutatása" : "Több mutatása"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
