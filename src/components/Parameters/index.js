import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getStaff } from 'store/modules/restaurant/selectors';
import { createSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { loadStaff } from 'store/modules/restaurant/actions';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../utilities/Button';
import { getUser } from 'store/modules/user/selectors';

const mapStateToProps = createSelector(
  [getStaff, getUser],
  (staff, currentUser) => {
    return { staff, currentUser };
  }
);

function Parameters({ staff, currentUser }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadStaff());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-goodFoodRed-500 font-bold">
        {t('parametersPage.title')}
      </h1>
      <p className="py-6 text-goodFoodMustard-500 mb-12">
        {t('parametersPage.description')}
      </p>
      <h2 className="text-3xl text-goodFoodRed-500 font-bold mb-3">
        {t('parametersPage.languages')}
      </h2>
      <select
        name="productType"
        id="productType"
        className="mt-2 py-2 px-3 rounded-md border mb-12"
        value={i18n.language}
        onChange={(e) => {
          i18n.changeLanguage(e.target.value);
        }}
      >
        <option selected value="fr">
          {t('languages.french')}
        </option>
        <option value="en">{t('languages.english')}</option>
      </select>
      <div className={'flex flex-row justify-between'}>
        <h2 className="text-3xl text-goodFoodRed-500 font-bold mb-3">
          {t('parametersPage.membersList')}
        </h2>
        {currentUser.roles === 'manager' ? (
          <Button
            type="add"
            className={'mr-20'}
            onClick={() => {
              navigate('/parameters/addStaff');
            }}
          />
        ) : (
          ''
        )}
      </div>
      <div className="flex flex-row justify-between pb-4 pad mr-12 mt-8">
        <table className="border-collapse text-gray-600 table-fixed min-w-full">
          <thead>
            <tr className="border-b-2 mb-2">
              <th className="w-1/5 p-2 text-left">
                {t('parametersPage.firstName')}
              </th>
              <th className="w-1/5 p-2 text-left">
                {t('parametersPage.lastName')}
              </th>
              <th className="w-1/5 p-2 text-left">
                {t('parametersPage.email')}
              </th>
              <th className="w-1/5 p-2 text-left">
                {t('parametersPage.status')}
              </th>
              <th className="w-1/5 p-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {staff.map((worker) => {
              return (
                <tr key={worker.id} className="text-left border-b-2">
                  <td className="py-6 px-4 text-left">{worker.firstname}</td>
                  <td className="py-6 px-4 text-left">{worker.lastname}</td>
                  <td className="py-6 px-4 text-left">{worker.email}</td>
                  <td className="py-6 px-4 text-left">{worker.roles}</td>
                  <td className="py-6 px-4 text-left">
                    {currentUser.roles === 'manager' ||
                    currentUser.id === worker.id ? (
                      <Button
                        type="edit"
                        onClick={() => {
                          navigate(`editStaff`, {
                            state: {
                              id: worker.id,
                              firstname: worker.firstname,
                              lastname: worker.lastname,
                              email: worker.email
                            }
                          });
                        }}
                        className="rounded-3xl"
                      />
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Parameters.propTypes = {
  staff: PropTypes.array
};

export default connect(mapStateToProps)(Parameters);
