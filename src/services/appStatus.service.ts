import appStatusSlice from '../redux/slices/appStatusSlice';
import store from '../redux/store';

const loadingStart = () => {
  store.dispatch(appStatusSlice.actions.setLoading(true));
};

const loadingStop = () => {
  store.dispatch(appStatusSlice.actions.setLoading(false));
};

export { loadingStart, loadingStop };
