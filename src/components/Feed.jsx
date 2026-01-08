import { useContext, useMemo, useReducer, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { feedReducer } from "../feedReducer";

const initialPosts = [
  { id: 1, author: "Alice", content: "Bienvenue sur mon nouveau réseau social ! 🚀", liked: false, likesCount: 12, comments: [] },
  { id: 2, author: "Bob", content: "React 19 et Tailwind, le combo parfait pour ce TP.", liked: true, likesCount: 45, comments: [] },
  { id: 3, author: "Charlie", content: "Le mode sombre est vraiment reposant pour les yeux.", liked: false, likesCount: 8, comments: [] },
  { id: 4, author: "David", content: "J'ai hâte de voir la suite du projet !", liked: false, likesCount: 5, comments: [] },
  { id: 5, author: "Eve", content: "Design 'Desktop First' activé ! 💻", liked: false, likesCount: 21, comments: [] }
];

const Feed = () => {
  const [posts, dispatch] = useReducer(feedReducer, initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext); 
  const isDark = theme === "dark";
  const isConnected = user !== null;

  // --- PAGINATION ---
  const POSTS_PER_PAGE = 2;
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const term = searchTerm.toLowerCase();
      return (post.author.toLowerCase().includes(term) || post.content.toLowerCase().includes(term));
    });
  }, [posts, searchTerm]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + POSTS_PER_PAGE);
      setIsLoading(false);
    }, 600);
  };

  // --- ACTIONS POSTS ---
  const handlePublishPost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    dispatch({ 
      type: "ADD_POST", 
      payload: { id: Date.now(), author: user.name, content: newPostContent, liked: false, likesCount: 0, comments: [] } 
    });
    setVisibleCount(prev => prev + 1); // Pour voir son post immédiatement
    setNewPostContent("");
  };

  // --- ACTIONS COMMENTAIRES ---
  const handleAddComment = (e, postId) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("comment"); 
    if (!text || !text.trim()) return;
    dispatch({ type: "ADD_COMMENT", payload: { postId, comment: { id: Date.now(), text, date: new Date().toLocaleTimeString() } } });
    e.target.reset();
  };

  return (
    <div className={`min-h-screen py-10 transition-colors duration-500 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className="max-w-2xl mx-auto px-4">
        
        {/* RECHERCHE */}
        <div className="sticky top-6 z-20 mb-8">
          <input
            type="text"
            placeholder="🔍 Rechercher une publication..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setVisibleCount(POSTS_PER_PAGE); }}
            className={`w-full p-4 rounded-2xl shadow-xl border-none outline-none transition-all ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
          />
        </div>

        {/* PUBLIER UN POST (Shiva) */}
        {isConnected && (
          <div className={`mb-8 p-6 rounded-3xl shadow-md border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
            <textarea
              placeholder={`Quoi de neuf, ${user.name} ?`}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className={`w-full p-3 rounded-xl outline-none resize-none mb-3 ${isDark ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"}`}
              rows="3"
            />
            <div className="flex justify-end">
              <button onClick={handlePublishPost} disabled={!newPostContent.trim()} className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold shadow-lg disabled:opacity-50 transition-all active:scale-95">
                Publier
              </button>
            </div>
          </div>
        )}

        {/* LISTE DES POSTS */}
        <div className="space-y-8">
          {displayedPosts.map(post => (
            <div key={post.id} className={`rounded-3xl shadow-md border p-8 transition-all hover:shadow-2xl ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
              {/* Header Post */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-md uppercase">{post.author[0]}</div>
                <div>
                    <p className={`font-bold text-xl ${isDark ? "text-white" : "text-gray-900"}`}>{post.author}</p>
                    <p className="text-xs text-gray-400 font-semibold tracking-widest uppercase">Public • {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <p className={`text-2xl leading-relaxed mb-6 font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                {post.content}
              </p>

              {/* Barre d'Actions (Like & Suppr Post) */}
              <div className="flex items-center justify-between border-y py-2 mb-6 border-gray-100 dark:border-gray-700">
                <button 
                  disabled={!isConnected}
                  onClick={() => dispatch({ type: "TOGGLE_LIKE", payload: post.id })}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-2xl font-bold transition-all ${
                    !isConnected ? "opacity-20 grayscale cursor-not-allowed" : post.liked ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-2xl">{post.liked ? "👍" : "👍"}</span> 
                  {post.liked ? (post.likesCount || 0) + 1 : (post.likesCount || 0)} Likes
                </button>
                {isConnected && (
                  <button onClick={() => dispatch({ type: "DELETE_POST", payload: post.id })} className="text-gray-400 hover:text-red-500 p-3 transition-colors">🗑️</button>
                )}
              </div>

              {/* Section Commentaires */}
              <div className="space-y-4">
                {post.comments?.map(comment => (
                  <div key={comment.id} className="flex gap-4 group">
                    <div className="h-10 w-10 rounded-full bg-gray-500 shrink-0 flex items-center justify-center text-xs text-white uppercase font-bold">U</div>
                    <div className={`flex-1 rounded-2xl px-5 py-3 relative border ${isDark ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-100 text-gray-700"}`}>
                      
                      {editingComment?.commentId === comment.id ? (
                        <div className="flex flex-col gap-2">
                          <input 
                            className={`w-full p-2 rounded-xl outline-none text-sm ${isDark ? "bg-gray-800 text-white" : "bg-white border"}`}
                            value={editingComment.text} 
                            onChange={(e) => setEditingComment({...editingComment, text: e.target.value})}
                          />
                          <div className="flex gap-2 self-end">
                            <button onClick={() => setEditingComment(null)} className="text-xs font-bold uppercase text-gray-400">Annuler</button>
                            <button onClick={() => { dispatch({ type: "UPDATE_COMMENT", payload: { postId: post.id, commentId: comment.id, newText: editingComment.text }}); setEditingComment(null); }} className="bg-blue-600 text-white text-xs px-4 py-1 rounded-full font-bold">OK</button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-xs text-blue-500">Membre</span>
                            {isConnected && (
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-3 text-[10px] font-bold uppercase text-gray-400">
                                    <button onClick={() => setEditingComment({ postId: post.id, commentId: comment.id, text: comment.text })} className="hover:text-blue-500 transition-colors">Modifier</button>
                                    <button onClick={() => dispatch({ type: "DELETE_COMMENT", payload: { postId: post.id, commentId: comment.id } })} className="hover:text-red-500 transition-colors">Supprimer</button>
                                </div>
                            )}
                          </div>
                          <p className="text-sm leading-relaxed">{comment.text}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Formulaire Commentaire / Message Invité */}
                {isConnected ? (
                  <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex items-center gap-4 mt-6">
                    <div className="h-10 w-10 rounded-full bg-blue-100 shrink-0 flex items-center justify-center">👤</div>
                    <input 
                      name="comment" 
                      placeholder="Écrire un commentaire..." 
                      required 
                      className={`flex-1 border rounded-full px-6 py-3 text-sm outline-none transition-all ${isDark ? "bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-900" : "bg-gray-50 border-gray-100 focus:ring-2 focus:ring-blue-100 focus:bg-white"}`}
                    />
                    <button type="submit" className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all">
                        <span className="block transform -rotate-45">✈️</span>
                    </button>
                  </form>
                ) : (
                  <div className={`p-4 rounded-2xl text-center border-2 border-dashed ${isDark ? "border-gray-700 text-gray-600" : "border-gray-200 text-gray-400"}`}>
                      <p className="text-xs font-bold uppercase tracking-widest italic">🔒 Connectez-vous pour réagir</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION (Charger plus) */}
        <div className="mt-12 text-center pb-20">
          {isLoading ? (
             <div className="flex justify-center items-center gap-3 text-blue-600 font-black animate-pulse uppercase tracking-tighter">
                <div className="w-3 h-3 bg-current rounded-full"></div>
                <span>Syncronisation du flux...</span>
             </div>
          ) : (
            visibleCount < filteredPosts.length && (
              <button 
                onClick={handleLoadMore} 
                className={`px-12 py-5 font-black rounded-3xl border shadow-lg transition-all transform hover:scale-105 active:scale-95 uppercase tracking-tighter ${
                  isDark ? "bg-gray-800 text-blue-400 border-gray-700" : "bg-white text-blue-600 border-blue-50 hover:bg-blue-600 hover:text-white"
                }`}
              >
                Découvrir plus de publications
              </button>
            )
          )}
        </div>

      </div>
    </div>
  );
};

export default Feed;