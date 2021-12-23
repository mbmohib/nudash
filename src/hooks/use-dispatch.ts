import { useDispatch as useAppDispatch } from 'react-redux';

import { AppDispatch } from '../store/store';

const useDispatch = () => useAppDispatch<AppDispatch>();

export default useDispatch;
