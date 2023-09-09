import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import { Collapse } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Divider } from "@mui/material";
import CommentForm from "./CommentForm";
import { Box } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import ReactTimeAgo from "react-time-ago";
TimeAgo.addDefaultLocale(en);

export default function TestComment({
  username,
  comment,
  replies,
  getReplies,
  replyComment,
  editComment,
  deleteComment,
  activeComment,
  setActiveComment,
  addComment,
  updateComment,
}) {
  const timeAgo = new TimeAgo("en-US");
  console.log(timeAgo.format(new Date(comment.posted)));

  const [comments, setComments] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const canManage = username && username === comment.username;
  const [open, setOpen] = useState(false);
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;

  const handleReply = (event) => {
    event.stopPropagation();
    activeComment.type === "replying"
      ? setActiveComment({ id: null, type: null })
      : setActiveComment({ id: comment.id, type: "replying" });
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    activeComment.type === "editing"
      ? setActiveComment({ id: null, type: null })
      : setActiveComment({ id: comment.id, type: "editing" });
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    deleteComment(comment.id);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleReplyList = (event) => {
    event.stopPropagation();
    setOpen(!open);
  };

  return (
    <>
      <Divider sx={{ ml: "2px", mr: "2px" }} />
      <ListItem sx={{ width: "100%", padding: 0 }}>
        <Accordion
          sx={{ width: "100%" }}
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            // expandIcon={comment.content.length > 50 ? <ExpandMoreIcon /> : null}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <ListItemAvatar sx={{ display: "flex", alignItems: "flex-start" }}>
              <Avatar
                sx={{ flexShrink: 0, mt: "10px", ml: "0px" }}
                alt={`${comment.first_name} ${comment.last_name}`.toUpperCase()}
                src="/static/images/avatar/3.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              fullwidth="true"
              primary={
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{ color: "text.secondary" }}
                      variant="subtitle1"
                    >
                      {comment.username}
                    </Typography>

                    <Typography
                      sx={{
                        color: "text.secondary",
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                      variant="caption"
                    >
                      <ReactTimeAgo date={new Date(comment.posted)} />
                    </Typography>
                  </Box>
                  {!isEditing && (
                    <Box>
                      {!expanded ? (
                        <Box>
                          {comment.content.length > 50 ? (
                            <Box>
                              <Typography
                                sx={{
                                  display: "flex",
                                  wordBreak: "break-word",
                                }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {`${comment.content.slice(0, 70)}...`}
                              </Typography>
                            </Box>
                          ) : (
                            <Typography
                              sx={{
                                display: "inline",
                                wordBreak: "break-word",
                              }}
                              fullwidth="true"
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {`${comment.content}`}
                            </Typography>
                          )}
                        </Box>
                      ) : (
                        <Box>
                          <Typography
                            sx={{ display: "inline", wordBreak: "break-word" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {`${comment.content}`}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                  {!isEditing && (
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {username && (
                        <Tooltip title="Reply" placement="top-end">
                          <IconButton onClick={handleReply}>
                            <ReplyIcon fontSize="small" color="action" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {canManage && (
                        <Tooltip title="Edit" placement="top-end">
                          <IconButton onClick={handleEdit}>
                            <EditIcon fontSize="small" color="action" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {canManage && (
                        <Tooltip title="Delete" placement="top-end">
                          <IconButton onClick={handleDelete}>
                            <DeleteIcon fontSize="small" color="action" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {replies.length > 0 && (
                        <Tooltip title="See Replies" placement="top-end">
                          <IconButton onClick={handleReplyList}>
                            {open ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  )}
                  {(isEditing || isReplying) && (
                    <CommentForm
                      parentID={comment.id}
                      comment={comment}
                      addComment={addComment}
                      setActiveComment={setActiveComment}
                      updateComment={updateComment}
                      isEditing={isEditing}
                      isReplying={isReplying}
                    />
                  )}
                </Box>
              }
              primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
            ></ListItemText>
          </AccordionSummary>
        </Accordion>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItem sx={{ width: "100%", pt: 0, pr: 0, pb: 0 }}>
          {replies.length > 0 && (
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                padding: 0,
              }}
            >
              {replies
                .filter((reply) => reply.parent_id === comment.id)
                .map((reply) => {
                  return (
                    <TestComment
                      username={username}
                      key={reply.id}
                      contentLength={reply.content.length}
                      replies={getReplies(reply.id)}
                      activeComment={activeComment}
                      setActiveComment={setActiveComment}
                      getReplies={getReplies}
                      addComment={addComment}
                      deleteComment={deleteComment}
                      updateComment={updateComment}
                      comment={reply}
                    />
                  );
                })}
            </List>
          )}
        </ListItem>
      </Collapse>
    </>
  );
}
