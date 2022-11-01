import { fetchUser } from './redux/user/fetch-user';
import { selectFetchingUser, selectFetchUserError, selectUser } from './redux/user/user.selectors';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export const Header = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const fetchingUser = useAppSelector(selectFetchingUser);
  const fetchUserError = useAppSelector(selectFetchUserError);

  return (
    <header>
      {fetchingUser && <p>fetching user...</p>}
      {fetchUserError && <p>fetch user error: {fetchUserError}</p>}

      {user && <p>You are: {user.nick}</p>}
      {!user && <p>You are not authenticated</p>}

      <button onClick={() => dispatch(fetchUser())}>refetch user</button>
    </header>
  );
};
