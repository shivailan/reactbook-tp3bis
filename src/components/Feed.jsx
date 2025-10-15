import { useReducer } from "react";
import { feedReducer } from "../feedReducer";

const initialPosts = [
  { id: 1, author: "Alice", content: "Hello world!", liked: false },
  { id: 2, author: "Bob", content: "React is cool!", liked: false }
];

const Feed = () => {
  const [posts, dispatch] = useReducer(feedReducer, initialPosts);

  const addPost = () => {
    const newPost = {
      id: Date.now(),
      author: "Nouvel Auteur",
      content: "Contenu du nouveau post",
      liked: false
    };
    dispatch({ type: "ADD_POST", payload: newPost });
  };

  console.log("render <Feed>");

  return (
    <div>
      <h2>Feed</h2>
      <button onClick={addPost}>Ajouter un post</button>
      {posts.map(post => (
        <div key={post.id} style={{ border: "1px solid gray", margin: "5px", padding: "5px" }}>
          <p><strong>{post.author}</strong></p>
          <p>{post.content}</p>
          <button onClick={() => dispatch({ type: "TOGGLE_LIKE", payload: post.id })}>
            {post.liked ? "❤️" : "♡"} J’aime
          </button>
          <button onClick={() => dispatch({ type: "DELETE_POST", payload: post.id })}>
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
};

export default Feed;
