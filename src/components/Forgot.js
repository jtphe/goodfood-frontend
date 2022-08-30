import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { emailChecker } from '../helpers/emailChecker';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

function Forgot() {
  // const dispatch = useDispatch();
  let navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const _handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const _resetPassword = (event) => {
    event.preventDefault();
    if (emailChecker(email)) {
      setEmailSent(true);
      const payload = {
        email,
        navigate
      };
      console.log('payload :>> ', payload);
    }
  };

  console.log('emailSent :>> ', emailSent);

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
          {t('forgotPage.title')}
        </div>
        {!emailSent ? (
          <form>
            <div className="flex flex-col mt-6">
              <label className="mb-2" htmlFor="mail">
                <span className="after:content-['*'] after:ml-0.5  after:text-red-500 font-semibold">
                  {t('loginPage.email')}
                </span>
              </label>
              <input
                className={
                  'peer border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500'
                }
                type="text"
                name="mail"
                id="mail"
                placeholder={t('loginPage.emailPlaceHolder')}
                onChange={_handleEmailChange}
              />
            </div>
            <div className="flex flex-row">
              <button
                className="bg-goodFoodGrey-900 py-2 px-5 rounded-md w-full mt-8 text-white mr-6"
                name="return"
                id="return"
                onClick={() => navigate('/', { replace: true })}
              >
                {t('utilities.return')}
              </button>
              <button
                className="bg-goodFoodRed-500 py-2 px-5 rounded-md w-full mt-8 text-white"
                type="submit"
                name="reset"
                id="reset"
                onClick={() => _resetPassword()}
              >
                {t('forgotPage.reset')}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p>
              L'email pour réinitialiser votre mot de passe a bien été envoyé !
            </p>
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
