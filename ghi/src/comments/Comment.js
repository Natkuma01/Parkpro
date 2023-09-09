import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import List from "@mui/material/List";
import CommentForm from "./CommentForm";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup } from "@mui/material";
import { Fragment, useState } from "react";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLEssIcon from "@mui/icons-material/ExpandLess";
import ListItemIcon from "@mui/material/ListItemIcon";

const user = JSON.parse(localStorage.getItem("user"));

function Comment({
  comment,
  replies,
  username,
  getReplies,
  replyComment,
  editComment,
  deleteComment,
  activeComment,
  setActiveComment,
  addComment,
  updateComment,
}) {
  const canManage = username === comment.username && user;
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;
  const [open, setOpen] = useState(true);
  const handleReply = () => {
    setActiveComment({ id: comment.id, type: "replying" });
  };

  const handleEdit = () => {
    setActiveComment({ id: comment.id, type: "editing" });
  };

  const handleDelete = () => {
    deleteComment(comment.id);
  };

  const posted = new Date(comment.posted);
  const dateTime = posted.toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <>
      <ListItem alignItems="flex-start" sx={{ backgroundColor: "blue" }}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={comment.title}
          secondary={
            <Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment.username}
              </Typography>
              <Typography>{dateTime}</Typography>
              {comment.content}
            </Fragment>
          }
        />
        {/* <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          {user && <Button onClick={handleReply}>reply</Button>}
          {canManage && <Button onClick={handleEdit}>edit</Button>}
          {canManage && <Button onClick={handleDelete}>delete</Button>}
        </ButtonGroup> */}
        {replies.length > 0 && (
          <ListItemIcon on Click={() => setOpen(!open)}>
            {open ? <ExpandLEssIcon /> : <ExpandLEssIcon />}
          </ListItemIcon>
        )}
        {isReplying && (
          <CommentForm
            submitLabel="reply"
            parentID={comment.id}
            addComment={addComment}
            setActiveComment={setActiveComment}
            commentID={comment.id}
            parkCode={comment.parkCode}
            posted={comment.posted}
            updateComment={updateComment}
            isEditing={isEditing}
          />
        )}
        {isEditing && (
          <CommentForm
            submitLabel="update"
            parentID={comment.parent_id}
            updateComment={updateComment}
            setActiveComment={setActiveComment}
            commentID={comment.id}
            parkCode={comment.parkCode}
            posted={comment.posted}
            isEditing={isEditing}
            username={username}
          />
        )}
        {replies.length > 0 && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {replies.map((comment) => {
                return (
                  <ListItem>
                    <Comment
                      key={comment.id}
                      comment={comment}
                      replies={getReplies(comment.id)}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        )}
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default Comment;
