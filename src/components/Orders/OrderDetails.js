import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from 'components/utilities/utilitaryFunctions';
import { changeStatutOrder } from 'store/modules/order/actions';
import { useDispatch, connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getCurrentOrder,
  getCurrentOrderIsLoading
} from 'store/modules/order/selectors';
import PropTypes from 'prop-types';
import Button from 'components/utilities/Button';
// import { GoArrowRight } from 'react-icons/go';
// import Button from '../utilities/Button';
import moment from 'moment';
import ProgressBar from '@ramonak/react-progress-bar';
import i18n from 'i18next';

const mapStateToProps = createSelector(
  [getCurrentOrder, getCurrentOrderIsLoading],
  (currentOrder, currentOrderIsLoading) => ({
    currentOrder,
    currentOrderIsLoading
  })
);

function OrderDetails({ currentOrder, currentOrderIsLoading }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useLocation();
  const [statut, setStatut] = useState(currentOrder.statut);

  const orderDateParser = () => {
    console.log('i18n.language', i18n.language);
    return moment(order.createdAt).locale(i18n.language).format('D MMMM YYYY');
  };

  const renderProgressBar = () => {
    switch (statut) {
      case 0:
        return (
          <ProgressBar
            width="75%"
            height="40px"
            completed={25}
            customLabel={t('ordersPage.orderDetails.status1')}
            barContainerClassName="rounded-2xl"
            labelClassName="pr-6 text-white"
            bgColor="#DCB265"
          />
        );
      case 1:
        return (
          <ProgressBar
            width="75%"
            height="40px"
            completed={55}
            customLabel={t('ordersPage.orderDetails.status2')}
            barContainerClassName="rounded-2xl"
            labelClassName="pr-6 text-white"
            bgColor="#85AEA0"
          />
        );
      case 2:
        return (
          <ProgressBar
            width="75%"
            height="40px"
            completed={100}
            customLabel={t('ordersPage.orderDetails.status3')}
            barContainerClassName="rounded-2xl"
            labelClassName="pr-6 text-white"
            bgColor="#126454"
          />
        );
      default:
        return 'error';
    }
  };

  const _changeStatus = () => {
    const payload = {
      orderId: currentOrder.id,
      statut: currentOrder.statut + 1
    };
    setStatut(currentOrder.statut + 1);
    dispatch(changeStatutOrder({ payload }));
  };

  if (currentOrderIsLoading) {
    return (
      <div>
        <h1>Is Loading</h1>
      </div>
    );
  }

  return (
    <>
      <button
        className="text-goodFoodRed-500 font-bold mb-8 text-left text-xl"
        onClick={() => navigate(-1)}
      >
        {'<'} {capitalizeFirstLetter(t('utilities.return'))}
      </button>
      <div className="w-4/5">
        <h1 className="text-4xl text-goodFoodRed-500 font-bold mb-14">
          {t('ordersPage.orderDetails.title')}
        </h1>
        <h2 className="text-3xl text-gray-600">
          {t('ordersPage.orderDetails.order', { orderId: currentOrder.id })}
        </h2>
        <div className="mt-8">
          <p className="text-xl text-gray-600">
            <span className="font-bold">
              {t('ordersPage.orderDetails.address', {
                address: `${currentOrder.address}, ${currentOrder.postalCode} ${currentOrder.city}`
              })}
            </span>
          </p>
          <p className="text-xl text-gray-600">
            <span className="font-bold">
              {t('ordersPage.orderDetails.date', { date: orderDateParser() })}
            </span>
          </p>
        </div>
        <div className="mt-5">{renderProgressBar()}</div>
        <div className="mt-8 mb-20">
          {currentOrder.statut < 2 ? (
            <Button type="next" onClick={_changeStatus} className="w-auto" />
          ) : null}
        </div>
        <div className="mt-5">
          <h2 className="text-2xl">
            {t('ordersPage.orderDetails.orderSumUp')}
          </h2>
          <div className="border-t-2 border-slate-500 mt-5"></div>
        </div>
        <div className="mt-5">
          <table>
            <tbody>
              {currentOrder.products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td className="pr-40">{product.name}</td>
                    <td className="text-right text-goodFoodMustard-500 font-bold">
                      {product.price}
                    </td>
                    <td className="text-goodFoodMustard-500 font-bold">€</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t-2 border-slate-500 mt-5"></div>
        <div className="mt-5">
          <p className="text-3xl font-bla text-goodFoodMustard-500">
            {t('ordersPage.orderDetails.total')}: {currentOrder.price}€
          </p>
        </div>
      </div>
    </>
  );
}

OrderDetails.prototype = {
  order: PropTypes.object
};

export default connect(mapStateToProps)(OrderDetails);
