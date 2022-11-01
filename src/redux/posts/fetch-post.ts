import { AppThunk } from '../store';
import { selectPost } from './post.selectors';
import { clearFetchPostError, setFetchingPost, setFetchPostError, setPost } from './posts.reducer';

export const fetchPost = (postId: string): AppThunk => {
  return async (dispatch, getState, { postGateway }) => {
    if (selectPost(getState(), postId)) {
      return;
    }

    try {
      dispatch(clearFetchPostError());
      dispatch(setFetchingPost(true));

      const post = await postGateway.fetchPost(postId);

      if (post) {
        dispatch(setPost(post));
      } else {
        dispatch(setFetchPostError(`post ${postId} not found`));
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setFetchPostError(error.message));
      } else {
        throw error;
      }
    } finally {
      dispatch(setFetchingPost(false));
    }
  };
};
