import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { useNavigate } from "react-router-dom";
import { getToken } from '../store/modules/user/selectors';
import PropTypes from 'prop-types';

const mapStateToProps = createSelector([getToken], (token) => {
  return {
    isLoggedIn: token !== null
  };
});

function Login({ isLoggedIn }) {
  const { t } = useTranslation();
  let navigate = useNavigate();
  console.log('isLoggedIn =>', isLoggedIn)

  if(isLoggedIn){
    navigate("/", { replace: true });
  } 


  return (
    <div className="flex justify-center items-center h-screen">
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
        <form action="" method="get">
          <div className="flex flex-col mt-6">
            <label className="mb-2 font-semibold" htmlFor="mail">
              {t('loginPage.email')}
            </label>
            <input
              className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
              type="text"
              name="mail"
              id="mail"
              placeholder={t('loginPage.emailPlaceHolder')}
            />
          </div>
          <div className="flex flex-col mt-6">
            <div className="flex justify-between">
              <label className="mb-2 font-semibold" htmlFor="password">
                {t('loginPage.password')}
              </label>
              <a href="#" className="font-bold text-red-600">
                {t('loginPage.passwordForget')}
              </a>
            </div>
            <input
              className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
              type="text"
              name="password"
              id="password"
              placeholder={t('passwordPlaceHolder')}
            />
          </div>
          <button
            className="bg-goodfoodRed-500 py-2 px-5 rounded-md w-full mt-8 text-white"
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
  isLoggedIn: PropTypes.bool
}

export default connect(mapStateToProps)(Login);
