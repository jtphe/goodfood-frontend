import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from 'components/utilities/utilitaryFunctions';
import { useState, useEffect } from 'react';
import Button from '../utilities/Button';
import { createSelector } from 'reselect';
import { getError } from 'store/modules/error/selectors';
import { resetErrorState } from 'store/modules/error/actions';
import { updateStaff } from 'store/modules/restaurant/actions';

const mapStateToProps = createSelector([getError], (error) => ({ error }));

function EditStaff({ error }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [firstName, setFirstName] = useState(location.state.firstname);
  const [lastName, setLastName] = useState(location.state.lastname);
  const [email, setEmail] = useState(location.state.email);
  const [errorEmail, setErrorMail] = useState(false);

  const _updateStaff = async (event) => {
    dispatch(resetErrorState());
    event.preventDefault();
    const payload = {
      id: location.state.id,
      firstname: firstName,
      lastname: lastName,
      email: email,
      navigate: navigate,
      messageSuccess: `${t('parametersPage.editStaff.toastSuccess')}`,
      messageError: `${t('parametersPage.editStaff.toastError')}`
    };
    dispatch(updateStaff({ payload }));
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
      default:
        return null;
    }
  }

  useEffect(() => {
    if (error === 'An account with this email is already recorded') {
      setErrorMail(true);
    }

    dispatch(resetErrorState());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

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
                value={email}
                onChange={(e) => _handleInputChange('email', e)}
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
