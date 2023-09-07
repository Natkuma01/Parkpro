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

      className="form-box-shadow"
      sx={{
        width: 400,
        height: 500,
        borderRadius: "7px",
        opacity: "0.8",
      }}
    >
      <Grid container sx={{ pl: "15px" }}>
        <Grid item xs={12}>
          <Typography className="form-font" sx={{ fontSize: 26, fontWeight: 'bold' }}>
            Leave a comment
          </Typography>
        </Grid>
        <form method="POST" onSubmit={handleSubmit}>
          <Grid item xs={4} sx={{ pt: "10px" }}>
            <label htmlFor="comment-title" className="form-font">
              Title
            </label>
          </Grid>
          <Grid item xs={8}>
            <input
              className="text-field title-field"
              type="text"
              name="comment-title"
              value={title}
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ pt: "10px" }}>
            <label htmlFor="comment-content" className="form-font">
              Message
            </label>
          </Grid>
          <textarea
            className="text-field"
            name="comment-content"
            value={content}
            onChange={handleContentChange}
            cols="30"
            rows="10"
          ></textarea>
          <Grid item xs={12} sx={{ p:'10px' }}>
          <button className="form-button">Submit</button>
          </Grid>
        </form>
      </Grid>
    </Box>

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
    </Box>
  );
}

export default CommentForm;
