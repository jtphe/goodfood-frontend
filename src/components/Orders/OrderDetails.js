import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from 'components/utilities/utilitaryFunctions';
// eslint-disable-next-line no-unused-vars
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'components/utilities/Button';
// import { GoArrowRight } from 'react-icons/go';
// import Button from '../utilities/Button';
import ProgressBar from '@ramonak/react-progress-bar';
import i18n from 'i18next';
import { useState } from 'react';
import { changeStatutOrder } from 'store/modules/order/actions';

function OrderDetails() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // using navigate to get the order's details
  const order = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [statut, setStatut] = useState(order.state.statut);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  const currentDate = new Date(order.state.date);
  const orderDate = currentDate.toLocaleDateString(i18n.language, options);
  const renderProgressBar = () => {
    switch (statut) {
      case 0:
        return (
          <ProgressBar
            width="75%"
            height="40px"
            completed={25}
            customLabel={t('ordersPage.orderDetails.status1')}
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
            bgColor="#126454"
          />
        );
      default:
        return 'error';
    }
  };
  const changeStatus = () => {
    const payload = {
      orderId: order.state.id,
      statut: order.state.statut + 1
    };
    dispatch(changeStatutOrder({ payload }));
    setStatut(order.state.statut);
  };

  console.log(order);

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
          {t('ordersPage.orderDetails.order')}: #{order.state.id}
        </h2>
        <div className="mt-8">
          <p className="text-xl text-gray-600">
            <span className="font-bold">
              {t('ordersPage.orderDetails.address')}:
            </span>{' '}
            {order.state.address}
          </p>
          <p className="text-xl text-gray-600">
            <span className="font-bold">
              {t('ordersPage.orderDetails.date')}:
            </span>{' '}
            {orderDate}
          </p>
        </div>
        <div className="mt-5">{renderProgressBar()}</div>
        <div className="mt-8">
          {order.state.status !== 2 ? (
            <Button type="next" onClick={changeStatus} />
          ) : (
            ''
          )}
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
              {order.state.products.map((product) => {
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
          <p className="text-2xl font-bold text-goodFoodMustard-500">
            {t('ordersPage.orderDetails.total')}: {order.state.price}€
          </p>
        </div>
      </div>
    </>
  );
}

OrderDetails.prototype = {
  order: PropTypes.object
};

export default connect()(OrderDetails);
