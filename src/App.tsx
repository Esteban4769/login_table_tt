import '@fortawesome/fontawesome-free/css/all.min.css';

import React from 'react';
import './App.scss';
import Cookies from 'js-cookie';
import { NavBar } from './components/NavBar';
import { Main } from './components/Main';
import { useAppDispatch, useAppSelector } from './utils/hooks/reduxHooks';
import * as userActions from './features/user';

export const App: React.FC = () => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  if (!user) {
    const loggedUser = Cookies.get('user');

    if (loggedUser) {
      dispatch(userActions.set(JSON.parse(loggedUser)));
    }
  }

  return (
    <div className="starter">
      <NavBar />

      <Main />
    </div>
  );
};
