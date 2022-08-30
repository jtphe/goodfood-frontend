import React, { useEffect } from 'react';
import Button from '../utilities/Button';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadOrders, setCurrentOrder } from 'store/modules/order/actions';
import { createSelector } from 'reselect';
import { getOrders, getOrdersIsLoading } from 'store/modules/order/selectors';
import { IoIosRefresh } from 'react-icons/io';
import Skeleton from '@mui/material/Skeleton';

const mapStateToProps = createSelector(
  [getOrders, getOrdersIsLoading],
  (orders, ordersIsLoading) => {
    return { orders, ordersIsLoading };
  }
);

function Orders({ orders, ordersIsLoading }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(loadOrders({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _openOrderDetails = ({ order }) => {
    const payload = { order };
    dispatch(setCurrentOrder({ payload }));
    navigate(`/orders/details/${order.id}`);
  };

  const _renderButtonType = ({ order }) => {
    if (order.statut === 0) {
      return 'processing';
    } else if (order.statut === 1) {
      return 'delivering';
    } else {
      return 'delivered';
    }
  };

  const _refreshOrders = () => {
    const payload = {
      refresh: true
    };
    dispatch(loadOrders({ payload }));
  };

  // Used to loop through Skeleton and provide a key prop
  const keysArrays = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div>
      <h1 className="text-4xl text-goodFoodRed-500 font-bold">
        {t('ordersPage.title', { orders: orders.length })}
      </h1>
      <p className="py-6 text-goodFoodMustard-500 mr-12">
        {t('ordersPage.description')}
      </p>
      <button
        onClick={() => _refreshOrders()}
        className="flex flex-row bg-goodFoodGrey-900 w-64 px-2 py-3 rounded justify-center align-center mb-8 drop-shadow-md

        "
      >
        <IoIosRefresh size={20} className="pt-1 mr-4" color="white" />
        <p className="text-white">{t('utilities.button.refresh')}</p>
      </button>
      <div>
        {!ordersIsLoading ? (
          <table className="border-collapse text-gray-600 table-fixed md:table-auto">
            <thead>
              <tr className="border-b-2 mb-2">
                <th className="w-1/6 p-2">{t('ordersPage.orderNumber')}</th>
                <th className="w-2/6 p-2">{t('ordersPage.adress')}</th>
                <th className="w-1/6 p-2">{t('ordersPage.price')}</th>
                <th className="w-1/6 p-2">{t('ordersPage.status')}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order.id} className="text-left border-b-2">
                    <td className="py-6 px-4">#{order.id}</td>
                    <td className="py-6 px-4">{order.address}</td>
                    <td className="py-6 px-4 text-center">{order.price}€</td>
                    <td className="py-6 px-4 text-center">
                      <Button
                        type={_renderButtonType({ order })}
                        onClick={() => {
                          _openOrderDetails({ order });
                        }}
                        className="rounded-3xl"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="mr-12 mt-20">
            {keysArrays.map((key) => (
              <Skeleton key={key} animation="wave" height={80} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Orders);
