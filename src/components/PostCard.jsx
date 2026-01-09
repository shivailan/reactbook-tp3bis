import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div>
      <Link to={`/user/${post.author}`}>
        <strong>{post.author}</strong>
      </Link>

      <p>{post.content}</p>
    </div>
  );
}

export default PostCard;
