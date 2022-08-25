import React from 'react';
import Button from '../utilities/Button';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { loadOrders } from 'store/modules/order/actions';
import { createSelector } from 'reselect';
import { getOrders } from 'store/modules/order/selectors';

const mapStateToProps = createSelector([getOrders], (orders) => {
  return { orders };
});

function Orders({ orders }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(loadOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(orders);

  return (
    <div>
      <h1 className="text-4xl text-goodFoodRed-500 font-bold">
        {t('ordersPage.title')}
      </h1>
      <p className="py-6 text-goodFoodMustard-500">
        {t('ordersPage.description')}
      </p>

      <div>
        <table className="border-collapse text-gray-600 table-fixed md:table-auto">
          <thead>
            <tr className="border-b-2 border-goodfFoodGrey-500">
              <th className="w-1/6 p-2">{t('ordersPage.orderNumber')}</th>
              <th className="w-2/6 p-2">{t('ordersPage.adress')}</th>
              <th className="w-1/6 p-2">{t('ordersPage.price')}</th>
              <th className="w-1/6 p-2">{t('ordersPage.status')}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order.id} className="text-left">
                  <td className="py-2 px-4">#{order.id}</td>
                  <td className="py-2 px-4">{order.address}</td>
                  <td className="py-2 px-4 text-center">{order.price}€</td>
                  <td className="py-2 px-4 text-center">
                    <Button
                      type="processing"
                      onClick={() => {
                        navigate(`/orders/details/${order.id}`);
                      }}
                    />
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

export default connect(mapStateToProps)(Orders);
