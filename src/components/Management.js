/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { loadProducts } from '../store/modules/product/actions';
import {
  getProducts,
  getProductsIsLoading
} from '../store/modules/product/selectors';
import { createSelector } from 'reselect';
import { IoIosRefresh } from 'react-icons/io';
import classNames from 'classnames';
import Skeleton from '@mui/material/Skeleton';

const mapStateToProps = createSelector(
  [getProducts, getProductsIsLoading],
  (products, productsListLoading) => {
    return { products, productsListLoading };
  }
);

function Management({ products, productsListLoading }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts({}));
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

  const _refreshQuantity = () => {
    const payload = {
      refresh: true
    };
    dispatch(loadProducts({ payload }));
  };

  return (
    <div>
      <h1 className="text-4xl text-goodFoodRed-500 font-bold">
        {t('managementPage.title')}
      </h1>
      <p className="py-6 text-goodFoodMustard-500">
        {t('managementPage.description')}
      </p>
      <button
        onClick={() => _refreshQuantity()}
        className="flex flex-row bg-goodFoodGrey-900 w-64 px-2 py-3 rounded justify-center align-center mb-8 drop-shadow-md mb-16"
      >
        <IoIosRefresh size={20} className="pt-1 mr-4" color="white" />
        <p className="text-white">{t('utilities.button.refresh')}</p>
      </button>
      {!productsListLoading ? (
        <div className="flex flex-1 flex-wrap">{productsList}</div>
      ) : (
        <div className="flex flex-1 flex-wrap">
          {[...Array(15)].map(() => (
            <Skeleton
              variant="rectangular"
              width={192}
              height={192}
              className="rounded-xl mr-6 mb-6"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(Management);
