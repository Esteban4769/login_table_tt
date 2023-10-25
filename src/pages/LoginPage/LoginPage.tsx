/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import Cookies from 'js-cookie';
import { login } from '../../api/user';
import { usePageError } from '../../utils/hooks/usePageError';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import * as userActions from '../../features/user';

export const LoginPage = () => {
  const navigate = useNavigate();

  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [error, setError] = usePageError('');

  return (
    <div className="container">
      {
        user ? (
          <h1 className="title">
            Already logged as&nbsp;
            <span className="has-text-success">
              {user.username}
            </span>
          </h1>
        ) : (
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validateOnMount
            onSubmit={({ username, password }) => {
              return login({ username, password })
                .then(() => {
                  Cookies.set('user', JSON.stringify({ username, password }));

                  dispatch(userActions.set({ username, password }));

                  navigate('/table');
                })
                .catch(() => {
                  setError('Invalid username or password');
                });
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form className="box">
                <h1 className="title">Log in</h1>

                <div className="field">
                  <label htmlFor="username" className="label">
                    Username
                  </label>
                  <div className="control has-icons-left has-icons-right">
                    <Field
                      name="username"
                      type="text"
                      id="username"
                      placeholder="Your username"
                      className={cn('input', {
                        'is-danger': touched.username && errors.username,
                      })}
                    />

                    <span className="icon is-small is-left">
                      <i className="fas fa-user" />
                    </span>

                    {touched.username && errors.username && (
                      <span className="icon is-small is-right has-text-danger">
                        <i className="fas fa-exclamation-triangle"></i>
                      </span>
                    )}
                  </div>

                  {touched.username && errors.username && (
                    <p className="help is-danger">{errors.username}</p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="password" className="label">
                    Password
                  </label>

                  <div className="control has-icons-left has-icons-right">
                    <Field
                      name="password"
                      type="password"
                      id="password"
                      placeholder="*******"
                      className={cn('input', {
                        'is-danger': touched.password && errors.password,
                      })}
                    />

                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>

                    {touched.password && errors.password && (
                      <span className="icon is-small is-right has-text-danger">
                        <i className="fas fa-exclamation-triangle"></i>
                      </span>
                    )}
                  </div>
                </div>

                <div className="field">
                  <button
                    type="submit"
                    className={cn('button is-success has-text-weight-bold', {
                      'is-loading': isSubmitting,
                    })}
                  >
                    Log in
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )
      }

      {error && (
        <p className="notification is-danger is-light">
          {error}
        </p>
      )}
    </div>
  );
};
