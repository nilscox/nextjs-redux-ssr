import { State } from '../store';
import { Post } from './posts.reducer';

export const selectPost = (state: State, postId: string): Post | undefined => {
  return state.posts.posts[postId];
};

export const selectFetchingPost = (state: State) => {
  return state.posts.fetching;
};

export const selectFetchPostError = (state: State) => {
  return state.posts.error;
};
