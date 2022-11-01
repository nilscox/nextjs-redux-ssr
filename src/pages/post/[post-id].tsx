import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Header } from '../../header';

import { inMemoryDependencies } from '../../redux/in-memory-dependencies';
import { fetchPost } from '../../redux/posts/fetch-post';
import { selectFetchingPost, selectFetchPostError, selectPost } from '../../redux/posts/post.selectors';
import { createStore, State } from '../../redux/store';
import { fetchUser } from '../../redux/user/fetch-user';
import { useAppDispatch } from '../../use-app-dispatch';
import { useAppSelector } from '../../use-app-selector';

type PostPageProps = {
  state: State;
};

type Params = {
  'post-id': string;
};

export const getServerSideProps: GetServerSideProps<PostPageProps, Params> = async ({ params }) => {
  const store = createStore(inMemoryDependencies);

  await store.dispatch(fetchUser());
  await store.dispatch(fetchPost(params!['post-id']));

  return {
    props: {
      state: store.getState(),
    },
  };
};

export default function PostPage() {
  const router = useRouter();
  const postId = router.query['post-id'] as string;

  const dispatch = useAppDispatch();

  const post = useAppSelector(selectPost, postId);
  const fetching = useAppSelector(selectFetchingPost);
  const error = useAppSelector(selectFetchPostError);

  useEffect(() => {
    dispatch(fetchPost(postId));
  }, [dispatch, postId]);

  return (
    <>
      <Header />

      {fetching && <p>fetching post {postId}</p>}
      {error && <p>error fetching post: {error}</p>}

      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </>
      )}

      <button onClick={() => dispatch(fetchPost(postId))}>refetch post</button>

      <p>
        <Link href="/">↩ back</Link>
      </p>
    </>
  );
}
