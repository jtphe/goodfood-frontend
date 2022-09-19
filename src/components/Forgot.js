import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { emailChecker } from '../helpers/emailChecker';
import { connect, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sendForgotEmail } from 'store/modules/app/actions';
import { IoClose } from 'react-icons/io5';
import { checkPasswordLength } from '../helpers/passwordManager';
import { updateForgottenPassword } from 'store/modules/user/actions';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

function Forgot() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { t } = useTranslation();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userToken, setUserToken] = useState('');
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [emailInvalid, setInvalidEmail] = useState(false);
  const [notSamePassword, setNotSamePassword] = useState(false);
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const [emtyPassword, setEmptyPassword] = useState(false);

  useEffect(() => {
    setUserToken(searchParams.get('token'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const _resetPassword = (event) => {
    event.preventDefault();
    setErrorMail(false);
    setEmailEmpty(false);
    setInvalidEmail(false);
    if (email !== '' && emailChecker(email)) {
      setEmailSent(true);
      const payload = {
        email,
        navigate
      };
      dispatch(sendForgotEmail({ payload }));
    } else {
      setErrorMail(true);
      if (email === '') {
        setEmailEmpty(true);
      } else if (!emailChecker(email)) {
        setInvalidEmail(true);
      }
    }
  };

  const _updatePassword = (event) => {
    event.preventDefault();
    setErrorMail(false);
    setNotSamePassword(false);
    setPasswordTooShort(false);
    setEmptyPassword(false);
    if (confirmPassword === password && checkPasswordLength(password)) {
      const payload = {
        password,
        token: userToken,
        messageSuccess: t('forgotPage.passwordUpdated'),
        navigate
      };
      dispatch(updateForgottenPassword({ payload }));
    } else {
      setErrorMail(true);
      if (password === '' && confirmPassword === '') {
        setEmptyPassword(true);
      } else if (confirmPassword !== password) {
        setNotSamePassword(true);
      } else if (!checkPasswordLength(password)) {
        setPasswordTooShort(true);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <div className="flex flex-col bg-white p-10 w-2/5 rounded-md shadow-md">
        <div
          className="flex justify-end"
          onClick={() => navigate('/login', { replace: true })}
        >
          <IoClose size={24} color="#D73427" className="cursor-pointer" />
        </div>
        <div className="self-center">
          <img
            src="./logo_corporate.png"
            alt="good food logo corporate"
            width="223px"
            height="206px"
          />
        </div>
        <div className="self-center my-3 font-bold text-3xl">
          {t('forgotPage.title')}
        </div>
        {!emailSent && !userToken ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex flex-col mt-6">
              <label className="mb-2" htmlFor="mail">
                <span className="after:content-['*'] after:ml-0.5  after:text-red-500 font-semibold">
                  {t('loginPage.email')}
                </span>
              </label>
              <input
                className={
                  'peer border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500' +
                  (errorMail ? ' border-goodFoodRed-500' : '')
                }
                type="text"
                name="mail"
                id="mail"
                placeholder={t('loginPage.emailPlaceHolder')}
                onChange={_handleEmailChange}
              />
              {emailEmpty && (
                <p className="mt-2 text-goodFoodRed-500 text-sm">
                  {t('forgotPage.emptyEmail')}
                </p>
              )}
              {emailInvalid && (
                <p className="mt-2 text-goodFoodRed-500 text-sm">
                  {t('forgotPage.invalidEmail')}
                </p>
              )}
            </div>
            <button
              className="bg-goodFoodRed-500 py-2 px-5 rounded-md w-full mt-8 text-white"
              name="reset"
              id="reset"
              onClick={(e) => _resetPassword(e)}
            >
              {t('forgotPage.reset')}
            </button>
          </form>
        ) : userToken ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex flex-col mt-6">
              <label className="mb-2" htmlFor="mail">
                <span className="after:content-['*'] after:ml-0.5  after:text-red-500 font-semibold">
                  {t('loginPage.password')}
                </span>
              </label>
              <input
                className={
                  'peer border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500 mb-4' +
                  (errorMail ? ' border-goodFoodRed-500' : '')
                }
                type="password"
                name="password"
                id="password"
                placeholder={t('loginPage.newPassword')}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className={
                  'peer border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500' +
                  (errorMail ? ' border-goodFoodRed-500' : '')
                }
                type="password"
                name="password"
                id="password"
                placeholder={t('loginPage.confirmNewPassword')}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {emtyPassword && (
                <p className="mt-2 text-goodFoodRed-500 text-sm">
                  {t('forgotPage.emptyPassword')}
                </p>
              )}
              {notSamePassword && (
                <p className="mt-2 text-goodFoodRed-500 text-sm">
                  {t('forgotPage.notSamePassword')}
                </p>
              )}
              {passwordTooShort && (
                <p className="mt-2 text-goodFoodRed-500 text-sm">
                  {t('forgotPage.passwordTooShort')}
                </p>
              )}
            </div>
            <button
              className="bg-goodFoodRed-500 py-2 px-5 rounded-md w-full mt-8 text-white"
              type="submit"
              name="reset"
              id="reset"
              onClick={(e) => _updatePassword(e)}
            >
              {t('forgotPage.reset')}
            </button>
          </form>
        ) : (
          <div>
            <p>{t('forgotPage.emailSent')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

Forgot.propTypes = {
  error: PropTypes.string
};

export default connect()(Forgot);
