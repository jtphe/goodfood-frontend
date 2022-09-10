import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  capitalizeFirstLetter,
  checkPassword
} from 'components/utilities/utilitaryFunctions';
import { createSelector } from 'reselect';
import { getError } from 'store/modules/error/selectors';
import { resetErrorState } from 'store/modules/error/actions';
import { updateStaff } from 'store/modules/restaurant/actions';
import Button from '../utilities/Button';
import {
  checkPasswordLength,
  checkPasswordSame
} from 'helpers/passwordManager';

const mapStateToProps = createSelector([getError], (error) => ({ error }));

function EditStaff({ error }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { firstname, lastname, email, id } = location.state;
  const [firstName, setFirstName] = useState(firstname);
  const [lastName, setLastName] = useState(lastname);
  const [userEmail, setEmail] = useState(email);
  const [errorEmail, setErrorMail] = useState(false);
  const [errorOldPassword, setErrorOldPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorPasswordLength, setErrorPasswordLength] = useState(false);
  const [errorPasswordMatch, setErrorPasswordMatch] = useState(false);

  useEffect(() => {
    if (error === 'An account with this email is already recorded') {
      setErrorMail(true);
    }
    if (error === 'Wrong old password') {
      setErrorOldPassword(true);
    }
    dispatch(resetErrorState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const _updateStaff = async (event) => {
    dispatch(resetErrorState());
    setErrorPasswordLength(false);
    setErrorPasswordMatch(false);
    event.preventDefault();
    const passwordLength = checkPasswordLength(password, passwordConfirmation);
    const passwordSame = checkPasswordSame(password, passwordConfirmation);
    if (firstName == firstname && lastName == lastname && userEmail == email) {
      return;
    }
    if (!passwordLength && password !== '') {
      setErrorPasswordLength(true);
      return;
    } else if (!passwordSame) {
      setErrorPasswordMatch(true);
      return;
    } else {
      const payload = {
        id,
        firstname: firstName,
        lastname: lastName,
        email: userEmail,
        newPassword: password,
        oldPassword: oldPassword,
        navigate: navigate,
        messageSuccess: `${t('parametersPage.editStaff.toastSuccess')}`,
        messageError: `${t('parametersPage.editStaff.toastError')}`
      };
      dispatch(updateStaff({ payload }));
    }
  };

  function _handleInputChange(inputName, event) {
    const inputValue = event.target.value;
    switch (inputName) {
      case 'firstName':
        setFirstName(inputValue);
        break;
      case 'lastName':
        setLastName(inputValue);
        break;
      case 'email':
        setEmail(inputValue);
        break;
      case 'oldPassword':
        setOldPassword(inputValue);
        break;
      case 'password':
        setPassword(inputValue);
        break;
      case 'passwordConfirmation':
        setPasswordConfirmation(inputValue);
        break;
      default:
        return null;
    }
  }

  return (
    <>
      <button
        className="text-goodFoodRed-500 font-bold mb-8 text-left text-xl"
        onClick={() => navigate(-1)}
      >
        {'<'} {capitalizeFirstLetter(t('utilities.return'))}
      </button>
      <div>
        <h1 className="text-4xl text-goodFoodRed-500 font-bold mb-14">
          {t('parametersPage.editStaff.title')}
        </h1>
        <form className="mb-10" onSubmit={_updateStaff} method="PUT">
          <div className="flex flex-col mt-6">
            <div className="flex flex-col w-3/6 my-3">
              <label htmlFor="firstName" className="mb-1">
                {t('parametersPage.addStaff.firstName')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                required="required"
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => _handleInputChange('firstName', e)}
              />
            </div>
            <div className="flex flex-col w-3/6 my-3">
              <label htmlFor="lastName" className="mb-1">
                {t('parametersPage.addStaff.lastName')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                required="required"
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => _handleInputChange('lastName', e)}
              />
            </div>
            <div className="flex flex-col w-3/6 my-3">
              <label htmlFor="email" className="mb-1">
                {t('parametersPage.addStaff.email')}
              </label>
              {errorEmail && (
                <p className="mt-2 text-goodFoodRed-500 text-sm">
                  {t('parametersPage.addStaff.errorEmail')}
                </p>
              )}
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                required="required"
                type="text"
                name="email"
                id="email"
                value={userEmail}
                onChange={(e) => _handleInputChange('email', e)}
              />
            </div>
            <div className="flex flex-col w-3/6 my-3">
              <label htmlFor="oldPassword" className="mb-1">
                {t('parametersPage.editStaff.oldPassword')}
              </label>
              {errorOldPassword && (
                <p className="mt-2 text-goodFoodRed-500 text-sm">
                  {t('parametersPage.editStaff.errorOldPassword')}
                </p>
              )}
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                placeholder=""
                type="password"
                name="oldPassword"
                id="password"
                value={oldPassword}
                onChange={(e) => _handleInputChange('oldPassword', e)}
              />
            </div>
            <div className="flex flex-col w-3/6 my-3">
              <label htmlFor="password" className="mb-1">
                {t('parametersPage.editStaff.password')}
              </label>
              {errorPasswordMatch && (
                <p className="mt-2 text-goodFoodRed-500 text-sm">
                  {t('parametersPage.editStaff.errorPasswordMatch')}
                </p>
              )}
              {errorPasswordLength && (
                <p className="mt-2 text-goodFoodRed-500 text-sm">
                  {t('parametersPage.editStaff.errorPasswordLength')}
                </p>
              )}
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                placeholder=""
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => _handleInputChange('password', e)}
              />
            </div>
            <div className="flex flex-col w-3/6 my-3">
              <label htmlFor="passwordConfirmation" className="mb-1">
                {t('parametersPage.editStaff.passwordConfirmation')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                placeholder=""
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => _handleInputChange('passwordConfirmation', e)}
              />
            </div>
          </div>
          <Button className={'mt-12'} type="update"></Button>
        </form>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(EditStaff);
