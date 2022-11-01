import { State } from '../store';

export const selectUser = (state: State) => {
  return state.user.user;
};

export const selectFetchingUser = (state: State) => {
  return state.user.fetching;
};

export const selectFetchUserError = (state: State) => {
  return state.user.error;
};
