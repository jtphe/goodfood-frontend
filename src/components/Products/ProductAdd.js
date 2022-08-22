import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from 'components/utilities/utilitaryFunctions';
import { useDispatch, connect } from 'react-redux';
import { createProduct } from 'store/modules/product/actions';
import PropTypes from 'prop-types';
import Button from '../utilities/Button';

function ProductAdd() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productType, setProductType] = useState(1);
  const [productPrice, setProductPrice] = useState('');
  const [productDiscount, setProductDiscount] = useState('');
  const [productStock, setProductStock] = useState('');

  const _createProduct = (event) => {
    event.preventDefault();
    const payload = {
      name: productName,
      description: productDescription,
      productType: parseInt(productType, 10),
      price: parseFloat(productPrice),
      discount: productDiscount.length > 0 ? parseFloat(productDiscount) : null,
      stock: parseInt(productStock),
      image: document.getElementById('image').value,
      navigate: navigate,
      // restaurant_id: user.restaurant.id
      messageSuccess: t('toastify.productAdd'),
      messageError: t('toastify.error')
    };
    dispatch(createProduct({ payload }));
  };

  function _handleInputChange(inputName, event) {
    const inputValue = event.target.value;
    switch (inputName) {
      case 'productName':
        setProductName(inputValue);
        break;
      case 'productDescription':
        setProductDescription(inputValue);
        break;
      case 'productPrice':
        setProductPrice(inputValue);
        break;
      case 'productDiscount':
        setProductDiscount(inputValue);
        break;
      case 'productStock':
        setProductStock(inputValue);
        break;
      case 'productType':
        setProductType(inputValue);
        break;
      default:
        return null;
    }
  }

  return (
    <>
      <button
        className="text-goodFoodRed-500 font-bold mb-16 text-left text-xl"
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
            <div className="flex flex-col w-3/6">
              <label htmlFor="name">
                {t('productsPage.addPage.productName')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                name="name"
                id="name"
                value={productName}
                onChange={(e) => _handleInputChange('productName', e)}
              />
            </div>
            <div className="flex flex-col mt-5 w-3/6">
              <label htmlFor="description">
                {t('productsPage.addPage.productDescription')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                name="description"
                id="description"
                value={productDescription}
                onChange={(e) => _handleInputChange('productDescription', e)}
              />
            </div>
            <div className="mt-5">
              <div>
                <label>{t('productsPage.addPage.productType')}</label>
              </div>
              <select
                name="productType"
                id="productType"
                className="p-2"
                value={productType}
                onChange={(e) => _handleInputChange('productType', e)}
              >
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
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500 w-28 mr-2"
                type="text"
                name="price"
                id="price"
                value={productPrice}
                onChange={(e) => _handleInputChange('productPrice', e)}
              />
              <span>€</span>
            </div>
            <div className="flex flex-row mt-6 items-baseline text-right">
              <label htmlFor="discount" className="mr-3">
                {t('productsPage.addPage.productDiscount')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500 w-28 mr-2"
                type="text"
                name="discount"
                id="discount"
                value={productDiscount}
                onChange={(e) => _handleInputChange('productDiscount', e)}
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
                value={productStock}
                onChange={(e) => _handleInputChange('productStock', e)}
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
  user: PropTypes.object
};

export default connect()(ProductAdd);
