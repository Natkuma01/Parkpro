import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import CommentForm from "./Comment.css";

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
  const canManage = username === comment.username;
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;

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
    <div className={`Comment ${comment.parent_id ? "child" : null}`}>
      <div className="title">{comment.parentID}</div>
      <div className="username">{comment.username}</div>
      <div className="content">{comment.content}</div>
      <div className="created">{dateTime}</div>
      <div className="Comment-actions">
        <button onClick={handleReply}>reply</button>
        {canManage && <button onClick={handleEdit}>edit</button>}
        {canManage && <button onClick={handleDelete}>delete</button>}
      </div>
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
        <div className="replies">
          {replies.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                replies={getReplies(comment.id)}
              />
            );
          })}
        </div>
      )}
      {username == comment.username && (
        <div className="Comment-actions">
          <button>reply</button>
          <button>edit</button>
          <button>delete</button>
        </div>
      )}
    </div>
  );
}

export default Comment;
