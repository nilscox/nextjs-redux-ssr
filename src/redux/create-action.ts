import { Action, AnyAction, Reducer } from 'redux';

type PayloadAction<Type extends string, Payload> = Action<Type> & {
  payload: Payload;
};

export const createCustomAction = <State, Type extends string, Params extends unknown[]>(
  type: Type,
  updater: (state: State, ...params: Params) => State
) => {
  const createAction = (...params: Params): PayloadAction<Type, Params> => ({
    type,
    payload: params,
  });

  const isAction = (action: AnyAction): action is PayloadAction<Type, Params> => {
    return action.type === type;
  };

  const reducer = (state: State, action: PayloadAction<Type, Params>): State => {
    return updater(state, ...action.payload);
  };

  createAction.isAction = isAction;
  createAction.reducer = reducer;

  return createAction;
};

type CustomAction<State> = ReturnType<typeof createCustomAction<State, any, any>>;

export const reduceCustomActions = <State>(
  state: State,
  action: AnyAction,
  customActions: Array<CustomAction<State>>
): State => {
  for (const customAction of customActions) {
    if (customAction.isAction(action)) {
      return customAction.reducer(state, action);
    }
  }

  return state;
};

export const createCustomActionsReducer = <State>(
  initialState: State,
  actions: Array<CustomAction<State>>
): Reducer<State, AnyAction> => {
  return (state = initialState, action) => reduceCustomActions(state, action, actions);
};
