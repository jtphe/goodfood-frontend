import React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { getProducts } from 'store/modules/product/selectors';
import { createSelector } from 'reselect';
import { loadProducts } from 'store/modules/product/actions';
import PropTypes from 'prop-types';
import Button from '../utilities/Button';

const mapStateToProps = createSelector([getProducts], (products) => {
  return { products };
});

function Products({ products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(loadProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="text-4xl text-goodFoodRed-500 font-bold">
        {t('productsPage.title')}
      </h1>
      <p className="text-goodFoodMustard-500 font-semibold mt-6">
        {t('productsPage.description')}
      </p>
      <div className="flex flex-row mt-8">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="bg-white p-4 first:ml-0 m-4 w-60 flex flex-col justify-between text-center rounded-xl drop-shadow-xl"
            >
              <h3 className="font-black text-goodFoodMustard-500 mb-4 select-none">
                {product.name}
              </h3>
              <img
                className="px-2"
                src="./burger_placeholder.jpg"
                alt="burger"
              />
              <div>
                <Button
                  className={'mt-4'}
                  type="edit"
                  onClick={() => {
                    navigate(`/products/edit/${product.id}`);
                  }}
                ></Button>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        className={'mt-6'}
        type="addProduct"
        onClick={() => {
          navigate(`/products/add`);
        }}
      ></Button>
    </>
  );
}

Products.propTypes = {
  products: PropTypes.array
};

export default connect(mapStateToProps)(Products);
