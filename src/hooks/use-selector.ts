import {
  TypedUseSelectorHook,
  useSelector as useAppSelector,
} from 'react-redux';

import { RootState } from '../store/store';

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export default useSelector;
