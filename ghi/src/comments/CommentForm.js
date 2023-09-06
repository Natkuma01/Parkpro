import { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";

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
    <Box>
      <form method="POST" onSubmit={handleSubmit}>
        <Grid container className="comment-form">
          <Grid item xs={12}>
            <textarea
              className="text-box"
              name="comment-content"
              value={content}
              onChange={handleContentChange}
              placeholder="Comment"
            ></textarea>
          </Grid>
          <Grid item xs={10} />
          <Grid item xs={2}>
            <button className="form-button">Submit</button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default CommentForm;
