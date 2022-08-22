/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { loadProducts } from '../store/modules/product/actions';
import { getProducts } from '../store/modules/product/selectors';
import { createSelector } from 'reselect';
import classNames from 'classnames';

const mapStateToProps = createSelector([getProducts], (products) => {
  return { products };
});

function Management({ products }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productsList = products.map((product) => (
    <li key={product.id} className="list-none">
      <div
        className={classNames({
          'border rounded-xl p-3 justify-center text-center w-48 h-48 mr-6 mb-6 drop-shadow-xl': true,
          'bg-white': product.stock > 0,
          'bg-goodFoodRed-100': product.stock === 0,
          'border-white': product.stock > 0,
          'border-goodFoodRed-100': product.stock === 0
        })}
      >
        <h3 className="text-xl font-black text-goodFoodMustard-500">
          {product.name.toUpperCase()}
        </h3>
        {product.stock !== 0 ? (
          <h1
            className={classNames({
              'text-5xl pt-12 font-bold': true,
              'text-goodFoodGreen-500': product.stock >= 20,
              'text-goodFoodMustard-500':
                product.stock < 20 && product.stock >= 10,
              'text-goodFoodRed-500': product.stock < 10
            })}
          >
            {product.stock}
          </h1>
        ) : (
          <h3 className="text-xl pt-12 font-bold text-goodFoodRed-500">
            {t('managementPage.unavailable').toUpperCase()}
          </h3>
        )}
      </div>
    </li>
  ));

  return (
    <div>
      <h1 className="text-4xl text-goodFoodRed-500 font-bold">
        {t('managementPage.title')}
      </h1>
      <p className="py-6 text-goodFoodMustard-500 mb-12">
        {t('managementPage.description')}
      </p>
      <div className="flex flex-1 flex-wrap">{productsList}</div>
    </div>
  );
}

export default connect(mapStateToProps)(Management);
