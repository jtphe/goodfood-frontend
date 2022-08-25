import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from 'components/utilities/utilitaryFunctions';
// eslint-disable-next-line no-unused-vars
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Button from '../utilities/Button';

function OrderDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
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
          {t('productsPage.addPage.title')}
        </h1>
      </div>
    </>
  );
}

OrderDetails.prototype = {
  order: PropTypes.object
};

export default connect()(OrderDetails);
