import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  capitalizeFirstLetter,
  checkPassword
} from 'components/utilities/utilitaryFunctions';
import { createTeamMember } from 'store/modules/restaurant/actions';
import { createSelector } from 'reselect';
import { getError } from 'store/modules/error/selectors';
import { resetErrorState } from 'store/modules/error/actions';
import Button from '../utilities/Button';

const mapStateToProps = createSelector([getError], (error) => ({ error }));

function AddStaff({ error }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorMail] = useState(false);
  const [role, setRole] = useState('worker');

  useEffect(() => {
    if (error === 'An account with this email is already recorded') {
      setErrorMail(true);
    }

    dispatch(resetErrorState());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const _createStaff = (event) => {
    dispatch(resetErrorState());
    event.preventDefault();
    const passwordVerification = checkPassword(password, passwordConfirmation);
    if (!passwordVerification) {
      setErrorPassword(true);
      return;
    }
    const payload = {
      firstname: firstName,
      lastname: lastName,
      email,
      password,
      role,
      navigate,
      messageSuccess: t('parametersPage.addStaff.userCreated'),
      messageError: t('parametersPage.addStaff.errorUserCreation')
    };
    dispatch(createTeamMember({ payload }));
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

  const handleUserRole = (event) => {
    setRole(event.target.value);
  };

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
          {t('parametersPage.addStaff.title')}
        </h1>
        <form className="mb-10" onSubmit={_createStaff} method="POST">
          <div className="flex flex-col mt-6">
            <div className="flex flex-col w-3/6 my-3">
              <label htmlFor="firstName" className="mb-1">
                {t('parametersPage.addStaff.firstName')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                placeholder="ex: John"
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
                placeholder="ex: Doe"
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
                placeholder="ex: JohnDoe@mail.com"
                required="required"
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => _handleInputChange('email', e)}
              />
            </div>
            <div className="flex flex-col w-3/6 my-3">
              <label htmlFor="statut" className="mb-1">
                {t('parametersPage.addStaff.status')}
              </label>
              <select name="role" id="role" onChange={handleUserRole}>
                <option value="worker">
                  {t('parametersPage.addStaff.worker')}
                </option>
                <option value="manager">
                  {t('parametersPage.addStaff.manager')}
                </option>
              </select>
            </div>
            <div className="flex flex-col w-3/6 my-3">
              <label htmlFor="password" className="mb-1">
                {t('parametersPage.addStaff.password')}
              </label>
              {errorPassword && (
                <p className="mt-2 text-goodFoodRed-500 text-sm">
                  {t('parametersPage.addStaff.errorPasswordMatch')}
                </p>
              )}
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                placeholder="ex: JohnDoe@mail.com"
                required="required"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => _handleInputChange('password', e)}
              />
            </div>
            <div className="flex flex-col w-3/6 my-3">
              <label htmlFor="passwordConfirmation" className="mb-1">
                {t('parametersPage.addStaff.passwordConfirmation')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                placeholder="ex: JohnDoe@mail.com"
                required="required"
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => _handleInputChange('passwordConfirmation', e)}
              />
            </div>
          </div>
          <Button className={'mt-12'} type="add"></Button>
        </form>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(AddStaff);
