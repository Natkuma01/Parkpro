import { useState } from "react";

function CommentForm({
  submitLabel,
  addComment,
  username,
  parentID,
  activeComment,
  updateComment,
  setActiveComment,
  commentID,
  parkCode,
  posted,
  isEditing,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    isEditing
      ? updateComment(
          commentID,
          username,
          parkCode,
          content,
          title,
          posted,
          parentID
        )
      : addComment(title, content, username, parentID);
    setTitle("");
    setContent("");
    setActiveComment(null);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  return (
    <div className="CommentForm">
      <form method="POST" onSubmit={handleSubmit}>
        <label htmlFor="comment-title">Title</label>
        <input
          type="text"
          name="comment-title"
          value={title}
          // defaultValue={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="comment-content">Comment</label>
        <textarea
          name="comment-content"
          value={content}
          // defaultValue={content}
          onChange={handleContentChange}
          cols="30"
          rows="10"
        ></textarea>
        <button>{submitLabel}</button>
      </form>
    </div>
  );
}

export default CommentForm;
