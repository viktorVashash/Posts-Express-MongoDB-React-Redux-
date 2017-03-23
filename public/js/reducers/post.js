import { FETCH_POSTS, FETCH_POST, CREATE_POST } from '../actions/index';

const STATE = {
  all: [],
  post: null
}

export default function(state = STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, all: action.payload.data };
    case FETCH_POST:
      return { ...state, post: action.payload.data };
    default:
      return state;
  }
}
