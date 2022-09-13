import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  changeStatutOrder,
  updateCurrentOrderIsLoading
} from 'store/modules/order/actions';
import { useDispatch, connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getCurrentOrder,
  getCurrentOrderIsLoading
} from 'store/modules/order/selectors';
import PropTypes from 'prop-types';
import Button from 'components/utilities/Button';
import moment from 'moment';
import ProgressBar from '@ramonak/react-progress-bar';
import i18n from 'i18next';
import Skeleton from '@mui/material/Skeleton';

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
  const [statut, setStatut] = useState(currentOrder.statut);

  useEffect(() => {
    const payload = { value: false };
    dispatch(updateCurrentOrderIsLoading({ payload }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderDateParser = () => {
    if (i18n.language === 'fr-FR' || i18n.language === 'fr') {
      moment.locale('fr', {
        months:
          'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
            '_'
          )
      });
      return moment(currentOrder.createdAt).format('D MMMM YYYY');
    } else {
      moment.locale('en');
      return moment(currentOrder.create).format('MMMM Do YYYY');
    }
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
            customLabel={
              currentOrder.type === 1
                ? t('ordersPage.orderDetails.status3')
                : t('ordersPage.orderDetails.status4')
            }
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
      <div className="mr-12 mt-10">
        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
        <Skeleton variant="rounded" height={200} />
        <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
      </div>
    );
  }

  return (
    <>
      <button
        className="text-goodFoodRed-500 font-bold mb-8 text-left text-xl"
        onClick={() => {
          const payload = { value: true };
          dispatch(updateCurrentOrderIsLoading({ payload }));
          navigate(-1);
        }}
      >
        {'<'} {t('utilities.return')}
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
              {currentOrder.menus.length > 0 ? (
                <h3 className="font-black text-lg">
                  {t('ordersPage.orderDetails.menu')}
                </h3>
              ) : null}
              {currentOrder.menus.map((menu) => {
                return (
                  <div key={menu.id} className="mb-3">
                    <tr key={menu.food.id}>
                      <td className="pr-40">- {menu.food.name}</td>
                      <td className="text-right text-goodFoodMustard-500 font-bold">
                        {menu.food.price}
                      </td>
                      <td className="text-goodFoodMustard-500 font-bold">€</td>
                    </tr>
                    <tr key={menu.snack.id}>
                      <td className="pr-40">- {menu.snack.name}</td>
                      <td className="text-right text-goodFoodMustard-500 font-bold">
                        {menu.snack.price}
                      </td>
                      <td className="text-goodFoodMustard-500 font-bold">€</td>
                    </tr>
                    <tr key={menu.drink.id}>
                      <td className="pr-40">- {menu.drink.name}</td>
                      <td className="text-right text-goodFoodMustard-500 font-bold">
                        {menu.drink.price}
                      </td>
                      <td className="text-goodFoodMustard-500 font-bold">€</td>
                    </tr>
                  </div>
                );
              })}
              {currentOrder.products.length > 0 ? (
                <h3 className="font-black text-lg">
                  {t('ordersPage.orderDetails.products')}
                </h3>
              ) : null}
              {currentOrder.products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td className="pr-40">- {product.name}</td>
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
