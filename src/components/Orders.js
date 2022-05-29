import React from 'react';
import Button from './utilities/Button';
import { useTranslation } from 'react-i18next';

function Orders() {
  const { t } = useTranslation();

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
              <th className="w-1/6 p-2">{t('ordersPage.order')}</th>
              <th className="w-1/6 p-2">{t('ordersPage.price')}</th>
              <th className="w-1/6 p-2">{t('ordersPage.status')}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-left">
              <td className="py-2 px-4">#1</td>
              <td className="py-2 px-4">12 rue du puit 67000, Strasbourg</td>
              <td className="py-2 px-4">Menu Burger</td>
              <td className="py-2 px-4 text-center">12$</td>
              <td className="py-2 px-4 text-center">
                <Button type="processing" />
              </td>
            </tr>
            <tr className="text-left">
              <td className="py-2 px-4">#1</td>
              <td className="py-2 px-4">12 rue du puit 67000, Strasbourg</td>
              <td className="py-2 px-4">Menu Burger</td>
              <td className="py-2 px-4 text-center">12$</td>
              <td className="py-2 px-4 text-center">
                <Button type="delivering" />
              </td>
            </tr>
            <tr className="text-left">
              <td className="py-2 px-4">#1</td>
              <td className="py-2 px-4">12 rue du puit 67000, Strasbourg</td>
              <td className="py-2 px-4">Menu Burger</td>
              <td className="py-2 px-4 text-center">12$</td>
              <td className="py-2 px-4 text-center">
                <Button type="delivered" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
