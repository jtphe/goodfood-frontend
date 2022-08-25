import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from 'components/utilities/utilitaryFunctions';
// eslint-disable-next-line no-unused-vars
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'components/utilities/Button';
import { GoArrowRight } from 'react-icons/go';
// import Button from '../utilities/Button';

function OrderDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // using navigate to get the order's details
  const order = useLocation();
  console.log(order);
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
          {t('ordersPage.orderDetails.title')}
        </h1>
        <h2 className="text-3xl text-gray-600">
          {t('ordersPage.orderDetails.order')}: #{order.state.id}
        </h2>
        <div>
          <p className="text-xl text-gray-600">
            {t('ordersPage.orderDetails.address')}: {order.state.address}
          </p>
          <p className="text-xl text-gray-600">
            {t('ordersPage.orderDetails.date')}: {order.state.date}
          </p>
        </div>
        <div>
          <span>{t('ordersPage.orderDetails.status1')}</span>
          <GoArrowRight className="text-9xl inline text-goodFoodMustard-500" />
          <span>{t('ordersPage.orderDetails.status2')}</span>
          <GoArrowRight className="text-9xl inline text-goodFoodMustard-500" />
          <span>{t('ordersPage.orderDetails.status3')}</span>
        </div>
        <div>
          <Button type="next" />
        </div>
        <div>
          <h2>{t('ordersPage.orderDetails.orderSumUp')}</h2>
        </div>
        <div>
          <p>{t('ordersPage.orderDetails.total')}: €</p>
        </div>
      </div>
    </>
  );
}

OrderDetails.prototype = {
  order: PropTypes.object
};

export default connect()(OrderDetails);
