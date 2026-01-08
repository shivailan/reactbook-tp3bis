import { useReducer, useState } from "react";
import { feedReducer } from "../feedReducer";

const initialPosts = [
  { id: 1, author: "Alice", content: "Hello world!", liked: false, comments: [] },
  { id: 2, author: "Bob", content: "React is cool!", liked: false, comments: [] },
  { id: 3, author: "Charlie", content: "Début de la pagination", liked: false, comments: [] },
  { id: 4, author: "David", content: "Post numéro 4", liked: false, comments: [] },
  { id: 5, author: "Eve", content: "Dernier post initial", liked: false, comments: [] }
];

const Feed = () => {
  const [posts, dispatch] = useReducer(feedReducer, initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingComment, setEditingComment] = useState(null);

  // --- LOGIQUE DE PAGINATION ---
  const POSTS_PER_PAGE = 2; // Nombre de posts à charger à chaque fois
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  // Filtrage réactif
  const filteredPosts = posts.filter((post) => {
    const term = searchTerm.toLowerCase();
    return (
      post.author.toLowerCase().includes(term) || 
      post.content.toLowerCase().includes(term)
    );
  });

  // Sélection des posts visibles (Pagination)
  const displayedPosts = filteredPosts.slice(0, visibleCount);

const handleAddComment = (e, postId) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const text = formData.get("comment"); 
  
  if (!text || !text.trim()) return;

    const newComment = { id: Date.now(), text, date: new Date().toLocaleTimeString() };
    dispatch({ type: "ADD_COMMENT", payload: { postId, comment: newComment } });
    e.target.reset();
  };

  return (
    <div>
      <h2>Feed</h2>
      
      {/* Barre de Recherche */}
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(POSTS_PER_PAGE); // Réinitialise la pagination lors d'une recherche
        }}
        style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
      />

      {displayedPosts.map(post => (
        <div key={post.id} style={{ border: "1px solid #ddd", margin: "10px 0", padding: "15px" }}>
          <p><strong>{post.author}</strong></p>
          <p>{post.content}</p>
          
          <button onClick={() => dispatch({ type: "TOGGLE_LIKE", payload: post.id })}>
            {post.liked ? "❤️" : "♡"} J’aime
          </button>
          <button onClick={() => dispatch({ type: "DELETE_POST", payload: post.id })} style={{ color: "red", marginLeft: "10px" }}>
            Supprimer
          </button>

          {/* Section Commentaires */}
          <div style={{ marginTop: "15px", paddingLeft: "20px", background: "#f9f9f9" }}>
            <h5>Commentaires ({post.comments?.length || 0})</h5>
            {post.comments?.map(comment => (
              <div key={comment.id}>
                {editingComment?.commentId === comment.id ? (
                  <div>
                    <input 
                      value={editingComment.text} 
                      onChange={(e) => setEditingComment({...editingComment, text: e.target.value})}
                    />
                    <button onClick={() => {
                      dispatch({ type: "UPDATE_COMMENT", payload: { postId: post.id, commentId: comment.id, newText: editingComment.text }});
                      setEditingComment(null);
                    }}>Sauvegarder</button>
                  </div>
                ) : (
                  <p>
                    {comment.text}
                    <button onClick={() => setEditingComment({ postId: post.id, commentId: comment.id, text: comment.text })}>Modifier</button>
                    <button onClick={() => dispatch({ type: "DELETE_COMMENT", payload: { postId: post.id, commentId: comment.id } })}>X</button>
                  </p>
                )}
              </div>
            ))}
            <form onSubmit={(e) => handleAddComment(e, post.id)}>
              <input name="comment" placeholder="Ajouter un commentaire..." required />
              <button type="submit">Envoyer</button>
            </form>
          </div>
        </div>
      ))}

      {/* BOUTON CHARGER PLUS */}
      {visibleCount < filteredPosts.length && (
        <button 
          onClick={() => setVisibleCount(prev => prev + POSTS_PER_PAGE)}
          style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer", width: "100%" }}
        >
          Charger plus de posts...
        </button>
      )}

      {filteredPosts.length === 0 && <p>Aucun résultat.</p>}
    </div>
  );
};

export default Feed;