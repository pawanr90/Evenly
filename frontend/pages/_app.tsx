import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import { useAppDispatch } from '../store/hooks';
import { setCredentials, logout } from '../store/slices/authSlice';
import { users } from '../lib/api';
import '../styles/globals.css';

// Restores the session from a stored token on first load
function AuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
      return;
    }
    users
      .getProfile()
      .then((user) => dispatch(setCredentials({ user, token })))
      .catch(() => dispatch(logout()));
  }, [dispatch]);

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthBootstrap />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
