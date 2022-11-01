import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { Header } from '../header';
import { inMemoryDependencies } from '../redux/in-memory-dependencies';
import { createStore, State } from '../redux/store';
import { fetchUser } from '../redux/user/fetch-user';

type HomePageProps = {
  state: State;
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const store = createStore(inMemoryDependencies);

  await store.dispatch(fetchUser());

  return {
    props: {
      state: store.getState(),
    },
  };
};

export default function HomePage() {
  return (
    <>
      <Header />

      <h1>Home page</h1>

      <ul>
        <li>
          <Link href="/post/1">
            <a>Post 1</a>
          </Link>
        </li>

        <li>
          <Link href="/post/2">
            <a>Post 2</a>
          </Link>
        </li>
      </ul>
    </>
  );
}
