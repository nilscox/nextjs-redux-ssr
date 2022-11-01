import { createCustomAction, createCustomActionsReducer } from '../create-action';

export type Post = {
  id: string;
  date: string;
  title: string;
  content: string;
};

export type PostsState = {
  posts: Record<string, Post>;
  fetching: boolean;
  error?: string;
};

export const setPost = createCustomAction(
  'add-post',
  (state: PostsState, post: Post): PostsState => ({
    ...state,
    posts: {
      ...state.posts,
      [post.id]: post,
    },
  })
);

export const removePost = createCustomAction(
  'remove-post',
  (state: PostsState, postId: string): PostsState => {
    const posts = { ...state.posts };

    delete posts[postId];

    return { ...state, posts };
  }
);

export const setFetchingPost = createCustomAction(
  'fetching-post',
  (state: PostsState, fetching: boolean): PostsState => ({ ...state, fetching })
);

export const setFetchPostError = createCustomAction(
  'fetch-post-error',
  (state: PostsState, error: string | undefined): PostsState => ({ ...state, error })
);

export const clearFetchPostError = createCustomAction(
  'clear-fetch-post-error',
  ({ error: _, ...state }: PostsState): PostsState => state
);

const initialState: PostsState = {
  posts: {},
  fetching: false,
};

export const postsReducer = createCustomActionsReducer(initialState, [
  setPost,
  removePost,
  setFetchingPost,
  setFetchPostError,
  clearFetchPostError,
]);
