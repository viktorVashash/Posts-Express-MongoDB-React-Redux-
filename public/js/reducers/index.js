import { combineReducers } from 'redux';
import PostsReducer from './post';

const rootReducer = combineReducers({
  posts: PostsReducer
});

export default rootReducer;
