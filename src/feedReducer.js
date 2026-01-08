export const feedReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [{ ...action.payload, comments: [] }, ...state]; // Ajout en haut du feed
    case 'TOGGLE_LIKE':
      return state.map(post =>
        post.id === action.payload ? { ...post, liked: !post.liked } : post
      );
    case 'DELETE_POST':
      return state.filter(post => post.id !== action.payload);
    case 'ADD_COMMENT':
      return state.map(post =>
        post.id === action.payload.postId
          ? { ...post, comments: [...(post.comments || []), action.payload.comment] }
          : post
      );
    case 'DELETE_COMMENT':
      return state.map(post =>
        post.id === action.payload.postId
          ? { ...post, comments: post.comments.filter(c => c.id !== action.payload.commentId) }
          : post
      );
    case 'UPDATE_COMMENT':
      return state.map(post =>
        post.id === action.payload.postId
          ? {
              ...post,
              comments: post.comments.map(c =>
                c.id === action.payload.commentId ? { ...c, text: action.payload.newText } : c
              )
            }
          : post
      );
    default:
      return state;
  }
};