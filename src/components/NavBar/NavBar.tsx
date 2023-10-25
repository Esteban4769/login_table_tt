import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import * as userActions from '../../features/user';

export const NavBar = () => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  return (
    <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div className="navbar-start">
        <NavLink to="/" className="navbar-item has-text-weight-bold">
          Login
        </NavLink>

        <NavLink to="/table" className="navbar-item has-text-weight-bold">
          Table
        </NavLink>

      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {user && (
              <button
                type="submit"
                className="button is-light has-text-weight-bold"
                onClick={() => {
                  Cookies.remove('user');

                  dispatch(userActions.clear());
                }}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
