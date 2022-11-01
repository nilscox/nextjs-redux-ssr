import { composeWithDevTools } from '@redux-devtools/extension';
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createReduxStore } from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch, ThunkMiddleware } from 'redux-thunk';
import { PostGateway } from './posts/post.gateway';
import { postsReducer } from './posts/posts.reducer';
import { UserGateway } from './user/user.gateway';
import { userReducer } from './user/user.reducer';

export type Dependencies = {
  userGateway: UserGateway;
  postGateway: PostGateway;
};

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

export type State = ReturnType<typeof rootReducer>;

export const createStore = (dependencies: Dependencies, preloadedState?: State) => {
  const enhancer = applyMiddleware<AppThunkDispatch>(
    thunkMiddleware.withExtraArgument(dependencies) as AppThunkMiddleware
  );

  return createReduxStore(rootReducer, preloadedState, composeWithDevTools(enhancer) as typeof enhancer);
};

export type AppStore = ReturnType<typeof createStore>;

export type AppGetState = AppStore['getState'];
export type AppDispatch = AppStore['dispatch'];

export type AppSelector<Params extends unknown[], Result> = (state: State, ...params: Params) => Result;

type AppThunkMiddleware = ThunkMiddleware<State, AnyAction, Dependencies>;
type AppThunkDispatch = ThunkDispatch<State, Dependencies, AnyAction>;

export type AppThunk<Result = Promise<void>> = ThunkAction<Result, State, Dependencies, AnyAction>;
