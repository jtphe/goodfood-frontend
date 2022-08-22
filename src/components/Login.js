import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { emailChecker } from '../helpers/emailChecker';
import { checkPasswordLength } from '../helpers/passwordManager';
import { connect, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { userLogIn } from 'store/modules/user/actions';
import { useNavigate } from 'react-router-dom';
import { createSelector } from 'reselect';
import { getError } from 'store/modules/error/selectors';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { resetErrorState } from 'store/modules/error/actions';

const mapStateToProps = createSelector([getError], (error) => ({ error }));

function Login({ error }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMail, setErrorMail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  useEffect(() => {
    if (error === 'Bad Password') {
      setErrorMail(false);
      setErrorPassword(true);
    } else if (error === 'Bad ID') {
      setErrorPassword(false);
      setErrorMail(true);
    }

    // when changing component
    return function cleanup() {
      dispatch(resetErrorState());
    };
  }, [dispatch, error, errorMail, errorPassword]);

  const _handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const _handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const _checkCredentials = () => {
    if (!emailChecker(email) && !checkPasswordLength(password)) {
      setErrorMail(true);
      setErrorPassword(true);
    } else if (!emailChecker(email)) {
      setErrorMail(true);
      setErrorPassword(false);
    } else if (!checkPasswordLength(password)) {
      setErrorPassword(true);
      setErrorMail(false);
    }
    if (emailChecker(email) && checkPasswordLength(password)) {
      setErrorPassword(false);
      setErrorMail(false);
      return true;
    }
  };

  const _login = (event) => {
    event.preventDefault();
    if (_checkCredentials()) {
      const payload = {
        email,
        password,
        navigate
      };
      dispatch(userLogIn({ payload }));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <div className="flex flex-col bg-white p-10 w-2/5 rounded-md shadow-md">
        <div className="self-center">
          <img
            src="./logo_corporate.png"
            alt="good food logo corporate"
            width="223px"
            height="206px"
          />
        </div>
        <div className="self-center my-3 font-bold text-3xl">
          {t('loginPage.login')}
        </div>
        <form onSubmit={_login} method="get">
          <div className="flex flex-col mt-6">
            <label className="mb-2" htmlFor="mail">
              <span className="after:content-['*'] after:ml-0.5  after:text-red-500 font-semibold">
                {t('loginPage.email')}
              </span>
            </label>
            <input
              className={
                'peer border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500' +
                (errorMail ? ' border-goodfoodRed-500' : '')
              }
              type="text"
              name="mail"
              id="mail"
              placeholder={t('loginPage.emailPlaceHolder')}
              onChange={_handleEmailChange}
            />
            {errorMail && (
              <p className="mt-2 text-goodfoodRed-500 text-sm">
                {t('loginPage.emailError')}
              </p>
            )}
          </div>
          <div className="flex flex-col mt-6">
            <div className="flex justify-between">
              <label className="mb-2" htmlFor="password">
                <span className="after:content-['*']  after:ml-0.5 after:text-red-500 font-semibold">
                  {t('loginPage.password')}
                </span>
              </label>
              <a href="#" className="font-bold text-red-600">
                {t('loginPage.passwordForget')}
              </a>
            </div>
            <input
              className={
                'border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500' +
                (errorPassword ? ' border-goodFoodRed-500' : '')
              }
              type="password"
              name="password"
              id="password"
              placeholder={t('loginPage.passwordPlaceHolder')}
              onChange={_handlePasswordChange}
            />
            {errorPassword && (
              <p className="mt-2 text-goodFoodRed-500 text-sm">
                {t('loginPage.passwordError')}
              </p>
            )}
          </div>
          <button
            className="bg-goodFoodRed-500 py-2 px-5 rounded-md w-full mt-8 text-white"
            type="submit"
            name="submit"
            id="submit"
          >
            {t('loginPage.connection')}
          </button>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  error: PropTypes.string
};

export default connect(mapStateToProps)(Login);
