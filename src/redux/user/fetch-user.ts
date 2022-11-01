import { AppThunk } from '../store';
import { clearFetchUserError, setFetchingUser, setFetchUserError, setUser } from './user.reducer';

export const fetchUser = (): AppThunk => {
  return async (dispatch, getState, { userGateway }) => {
    try {
      dispatch(clearFetchUserError());
      dispatch(setFetchingUser(true));

      dispatch(setUser(await userGateway.fetchUser()));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setFetchUserError(error.message));
      } else {
        throw error;
      }
    } finally {
      dispatch(setFetchingUser(false));
    }
  };
};
