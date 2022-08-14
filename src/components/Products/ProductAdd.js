import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from 'components/utilities/utilitaryFunctions';
import Button from '../utilities/Button';
import { useDispatch, connect } from 'react-redux';
import { createProduct } from 'store/modules/product/actions';
import { createSelector } from 'reselect';
import { getUser } from 'store/modules/user/selectors';
import PropTypes from 'prop-types';

const mapStateToProps = createSelector([getUser], (user) => {
  return { user };
});

function ProductAdd({ user }) {
  console.log(user);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const _createProduct = (event) => {
    event.preventDefault();
    const payload = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      productType: parseInt(document.getElementById('productType').value),
      price: parseFloat(document.getElementById('price').value),
      discount: parseFloat(document.getElementById('discount').value),
      stock: parseInt(document.getElementById('stock').value),
      image: document.getElementById('image').value,
      restaurant_id: user.restaurant.id
    };
    dispatch(createProduct({ payload }));
  };

  return (
    <>
      <button
        className="text-goodFoodRed-500 font-bold mb-16 text-left"
        onClick={() => navigate(-1)}
      >
        {'<'} {capitalizeFirstLetter(t('utilities.return'))}
      </button>
      <div>
        <h1 className="text-4xl text-goodFoodRed-500 font-bold mb-14">
          {t('productsPage.addPage.title')}
        </h1>
        <form className="mb-10" onSubmit={_createProduct} method="POST">
          <div className="flex flex-col mt-6">
            <div className="flex flex-col">
              <label htmlFor="name">
                {t('productsPage.addPage.productName')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="description">
                {t('productsPage.addPage.productDescription')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                name="description"
                id="description"
              />
            </div>
            <div className="mt-5">
              <div>
                <label>{t('productsPage.addPage.productType')}</label>
              </div>
              <select name="productType" id="productType" className="p-2">
                <option value="1">Burger</option>
                <option value="2">Tacos</option>
                <option value="3">Pizza</option>
                <option value="4">Drink</option>
                <option value="5">Snack</option>
              </select>
              <br />
            </div>
            <div className="flex flex-row mt-6 items-baseline text-right">
              <label htmlFor="price" className="mr-3">
                {t('productsPage.addPage.productPrice')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500 w-28"
                type="text"
                name="price"
                id="price"
              />
              <span>€</span>
            </div>
            <div className="flex flex-row mt-6 items-baseline text-right">
              <label htmlFor="discount" className="mr-3">
                {t('productsPage.addPage.productDiscount')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500 w-28"
                type="text"
                name="discount"
                id="discount"
              />
              <span>%</span>
            </div>
            <div className="flex flex-row mt-6 items-baseline text-right">
              <label htmlFor="stock" className="mr-3">
                {t('productsPage.addPage.productStock')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500 w-28"
                type="text"
                name="stock"
                id="stock"
              />
            </div>
            <div className="flex flex-row mt-5">
              <label htmlFor="image" className="mr-3">
                {t('productsPage.addPage.productImage')}
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept=".png, .jpg"
                multiple={false}
              />
            </div>
          </div>
          <Button className={'mt-12'} type="add"></Button>
        </form>
      </div>
    </>
  );
}

ProductAdd.propTypes = {
  user: PropTypes.array
};

export default connect(mapStateToProps)(ProductAdd);
