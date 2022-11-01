import { createCustomAction, createCustomActionsReducer } from '../create-action';

export type User = {
  id: string;
  nick: string;
};

export type UserState = {
  user?: User;
  fetching: boolean;
  error?: string;
};

export const setUser = createCustomAction(
  'set-user',
  (state: UserState, user: User | undefined): UserState => ({ ...state, user: user })
);

export const setFetchingUser = createCustomAction(
  'fetching-user',
  (state: UserState, fetching: boolean): UserState => ({ ...state, fetching })
);

export const setFetchUserError = createCustomAction(
  'fetch-user-error',
  (state: UserState, error: string): UserState => ({ ...state, error })
);

export const clearFetchUserError = createCustomAction(
  'clear-fetch-user-error',
  ({ error: _, ...state }: UserState): UserState => state
);

const initialState: UserState = {
  fetching: false,
};

export const userReducer = createCustomActionsReducer(initialState, [
  setFetchingUser,
  setFetchUserError,
  setUser,
  clearFetchUserError,
]);
