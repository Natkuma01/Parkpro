import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";

function CommentList({ userData }) {
  const { token } = useAuthContext();
  const [comments, setComments] = useState([]);
  // const [userData, setUserData] = useState(localStorage.getItem("user"));
  const [activeComment, setActiveComment] = useState(null);

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   setUserData(JSON.parse(user));
  // }, []);

  const getReplies = (id) => {
    return comments
      .filter((comment) => {
        return comment.parent_id === id;
      })
      .sort((a, b) => a.posted - b.posted);
  };

  const addComment = async (title, content, username, parentID = null) => {
    const comment = {};
    comment.parent_id = parentID;
    comment.username = username;
    comment.parkCode = null;
    comment.content = content;
    comment.title = title;
    comment.posted = new Date();

    const url = `http://localhost:8000/api/comments`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(comment),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);

    if (!response.ok) {
      console.error("error posting comment");
    } else {
      const data = await response.json();

      setComments([data, ...comments]);
      console.log("comment posted");
    }
  };

  const deleteComment = async (comment_id) => {
    const del_url = `http://localhost:8000/api/comment/${comment_id}`;
    const fetchConfig = {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(del_url, fetchConfig);
      if (!response.ok) {
        console.error("Error deleting comment");
      } else {
        console.log("comment deleted");
      }
    } catch (error) {
      console.error(error);
    }

    const newComments = comments.filter((comment) => comment.id !== comment_id);
    setComments([...newComments]);
  };

  const updateComment = async (
    comment_id,
    username,
    parkCode,
    content,
    title,
    posted,
    parentID = null
  ) => {
    const update_url = `http://localhost:8000/api/comment/${comment_id}`;
    const comment = {};
    comment.id = comment_id;
    comment.parent_id = parentID;
    comment.username = username;
    comment.parkCode = parkCode;
    comment.content = content;
    comment.title = title;
    comment.posted = posted;

    const fetchConfig = {
      method: "put",
      body: JSON.stringify(comment),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(update_url, fetchConfig);
      if (!response.ok) {
        console.error("Error updating comment");
      } else {
        console.log("comment updated");
      }
    } catch (error) {
      console.error(error);
    }
    const updatedComment = comment;
    let newComments = comments.map((comment) => {
      if (updatedComment.id === comment.id) {
        return updatedComment;
      } else {
        return comment;
      }
    });
    setComments(newComments);
  };

  useEffect(() => {
    const url = `http://localhost:8000/api/comments`;
    const fetchComments = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error("Error loading comments data");
        } else {
          const data = await response.json();
          const reverseComments = data.comments.reverse();
          setComments(reverseComments);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="CommentList">
      <h3>Comments</h3>
      <div className="Comment-Form-Title">Write a Comment</div>
      <CommentForm
        submitLabel="Submit"
        username={userData.username}
        addComment={addComment}
        setActiveComment={setActiveComment}
        activeComment={activeComment}
        updateComment={updateComment}
      />
      <div className="Comment-Container">
        {comments
          .filter((comment) => !comment.parent_id)
          .map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                replies={getReplies(comment.id)}
                username={userData.username}
                activeComment={activeComment}
                parentID={comment.id}
                setActiveComment={setActiveComment}
                getReplies={getReplies}
                addComment={addComment}
                deleteComment={deleteComment}
                updateComment={updateComment}
              />
            );
          })}
      </div>
    </div>
  );
}

export default CommentList;
