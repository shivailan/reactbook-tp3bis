export const feedReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_POST':
      return [...state, action.payload];
    case 'TOGGLE_LIKE':
      return state.map(post =>
        post.id === action.payload ? { ...post, liked: !post.liked } : post
      );
    case 'DELETE_POST':
      return state.filter(post => post.id !== action.payload);
    default:
      return state;
  }
};
