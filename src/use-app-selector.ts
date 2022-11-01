import { useSelector } from 'react-redux';
import { AppSelector, State } from './redux/store';

export const useAppSelector = <Params extends unknown[], Result>(
  selector: AppSelector<Params, Result>,
  ...params: Params
) => {
  return useSelector<State, Result>((state) => selector(state, ...params));
};
