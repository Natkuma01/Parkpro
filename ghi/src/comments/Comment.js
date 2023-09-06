<<<<<<< HEAD
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import CommentForm from "./Comment.css";

let user = {};
if (!!localStorage.getItem("user")) {
  user = JSON.parse(localStorage.getItem("user"));
}
=======
import CommentForm from "./CommentForm";
>>>>>>> comment

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
<<<<<<< HEAD
  const canManage = username === comment.username && user;
=======
  const canManage = username === comment.username;
>>>>>>> comment
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
<<<<<<< HEAD
      <div className="username">{comment.username}</div>
      <div className="content">{comment.content}</div>
      <div className="created">{dateTime}</div>
      <div className="Comment-actions">
        {user && <button onClick={handleReply}>reply</button>}
=======
      {/* <div className="username">{comment.username}</div> */}
      <div className="content">{comment.content}</div>
      <div className="created">{dateTime}</div>
      <div className="Comment-actions">
        <button onClick={handleReply}>reply</button>
>>>>>>> comment
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
<<<<<<< HEAD
          {replies.map((comment) => {
=======
          {replies.reverse().map((comment) => {
>>>>>>> comment
            return (
              <Comment
                key={comment.id}
                comment={comment}
                replies={getReplies(comment.id)}
<<<<<<< HEAD
=======
                username={username}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                getReplies={getReplies}
                deleteComment={deleteComment}
                replyComment={replyComment}
                editComment={editComment}
                parentID={comment.id}
                addComment={addComment}
                updateComment={updateComment}
                isEditing={isEditing}
>>>>>>> comment
              />
            );
          })}
        </div>
      )}
<<<<<<< HEAD
      {username === comment.username && user && (
        <div className="Comment-actions">
          <button>reply</button>
          <button>edit</button>
          <button>delete</button>
        </div>
      )}
=======
>>>>>>> comment
    </div>
  );
}

export default Comment;
