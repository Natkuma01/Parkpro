import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";

function CommentForm({
  addComment,
  activeComment,
  updateComment,
  setActiveComment,
  isEditing,
  isReplying,
  comment,
  parentID,
}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: isEditing ? comment.content : null,
    },
  });
  const values = getValues();
  const maxTitle = 20;
  const maxComment = 140;

  const handleCancel = () => {
    reset();
    setActiveComment({ id: null, type: null });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit((data) => {
        isEditing
          ? updateComment(
              comment.id,
              comment.username,
              comment.parkCode,
              data.content,
              data.title,
              comment.posted,
              comment.parent_id
            )
          : addComment(data.content, user.username, parentID);
        setActiveComment({ id: null, type: null });
        reset();
      })}
      sx={{ mt: 1 }}
    >
      {errors.content?.type === "required" && (
        <Alert variant="outlined" severity="error">
          You cannont submit a blank comment
        </Alert>
      )}
      <TextField
        {...register("content", { required: true })}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Comment"
        multiline
        rows={4}
        id="comment-form-content"
        inputProps={{ maxLength: maxComment }}
        focused
        aria-invalid={errors.content ? "true" : "false"}
      />

      {!parentID && !isEditing && (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 0, mb: 2 }}
        >
          Add a comment
        </Button>
      )}

      {isReplying && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={handleCancel}
            variant="contained"
            sx={{ mt: 0, mb: 2, width: "47.5%" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 0, mb: 2, width: "47.5%" }}
          >
            Reply
          </Button>
        </Box>
      )}
      {isEditing && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={handleCancel}
            variant="contained"
            sx={{ mt: 0, mb: 2, width: "47.5%" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 0, mb: 2, width: "47.5%" }}
          >
            Update
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default CommentForm;
