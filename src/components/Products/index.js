import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { getProducts } from 'store/modules/product/selectors';
import { createSelector } from 'reselect';
import { loadProducts } from 'store/modules/product/actions';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import Button from '../utilities/Button';

const mapStateToProps = createSelector([getProducts], (products) => {
  return { products };
});

function Products({ products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // console.log(state);

  useEffect(() => {
    dispatch(loadProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="text-4xl text-goodFoodRed-500 font-bold">
        {t('productsPage.title')}
      </h1>
      <p className="text-goodFoodMustard-500 font-semibold mt-6 mb-12">
        {t('productsPage.description')}
      </p>
      <div className="flex flex-wrap">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="bg-white p-4 mr-12 mb-12 justify-between text-center rounded-xl drop-shadow-xl grow-1 shrink basis-2"
            >
              <h3 className="font-black text-goodFoodMustard-500 mb-4 select-none">
                {product?.name}
              </h3>
              <img
                className="px-2 rounded-2xl"
                src={product.image ? product.image : './no_photo_available.png'}
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
