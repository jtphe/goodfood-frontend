import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createSelector } from 'reselect';
import { getError } from 'store/modules/error/selectors';
import Button from '../utilities/Button';
import S3FileUpload from 'react-s3';
import { awsConfig } from '../../config';
import { toast } from 'react-toastify';
import { updateProduct } from 'store/modules/product/actions';

const mapStateToProps = createSelector([getError], (error) => ({ error }));

function ProductEdit() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id, name, description, price, discount, image } = location.state;
  const [productName, setProductName] = useState(name);
  const [productDescription, setProductDescription] = useState(description);
  const [productPrice, setProductPrice] = useState(price);
  const [productDiscount, setProductDiscount] = useState(discount);
  const [productImage, setProductImage] = useState(undefined);

  const _updateProduct = async (event) => {
    event.preventDefault();
    if (productDiscount === null) {
      setProductDiscount(0);
    }
    let payload = {
      id: id,
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      discount: productDiscount,
      navigate: navigate,
      messageSuccess: t('toastify.productEdit'),
      messageError: t('toastify.error')
    };
    if (
      productName === name &&
      productDescription === description &&
      productPrice === price &&
      productDiscount === discount &&
      productImage === undefined
    ) {
      toast.warn(t('error.nothingToUpdate'));
    } else if (
      productName !== name ||
      productDescription !== description ||
      productPrice !== price ||
      productDiscount !== discount ||
      productImage !== null
    ) {
      if (productImage) {
        await S3FileUpload.uploadFile(productImage, awsConfig)
          .then((data) => {
            payload.image = data.location;
          })
          .catch((err) => console.error(err));
      }
      dispatch(updateProduct({ payload }));
    }
  };

  function _handleInputChange(inputName, event) {
    const inputValue = event.target.value;
    switch (inputName) {
      case 'name':
        setProductName(inputValue);
        break;
      case 'description':
        setProductDescription(inputValue);
        break;
      case 'price':
        setProductPrice(inputValue);
        break;
      case 'discount':
        setProductDiscount(inputValue);
        break;
      default:
        return null;
    }
  }

  return (
    <>
      <button
        className="text-goodFoodRed-500 font-bold mb-8 text-left text-xl"
        onClick={() => navigate(-1)}
      >
        {'<'} {t('utilities.return')}
      </button>
      <div>
        <h1 className="text-4xl text-goodFoodRed-500 font-bold mb-14">
          {t('productsPage.editPage.title')}: {name}
        </h1>
        <form className="mb-10" onSubmit={_updateProduct} method="POST">
          <div className="flex flex-col mt-6 w-3/4">
            <div className="flex flex-col">
              <label htmlFor="name">
                {t('productsPage.editPage.editName')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                name="name"
                id="name"
                value={productName}
                onChange={(e) => _handleInputChange('name', e)}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="description">
                {t('productsPage.editPage.editDescription')}
              </label>
              <textarea
                rows="3"
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                name="description"
                id="description"
                value={productDescription}
                onChange={(e) => _handleInputChange('description', e)}
              />
            </div>
            <div className="flex flex-row mt-6 items-baseline text-right">
              <label htmlFor="price" className="mr-3">
                {t('productsPage.editPage.editPrice')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500 mr-2"
                type="number"
                name="price"
                id="price"
                value={productPrice}
                onChange={(e) => _handleInputChange('price', e)}
              />
              <span>€</span>
            </div>
            <div className="flex flex-row  mt-6 items-baseline">
              <label htmlFor="discount" className="mr-3">
                {t('productsPage.editPage.editDiscount')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500 mr-2"
                type="number"
                name="discount"
                id="discount"
                value={productDiscount}
                onChange={(e) => _handleInputChange('discount', e)}
              />
              <span>%</span>
            </div>
            <div className="flex flex-row mt-5">
              <label htmlFor="image" className="mr-3">
                {t('productsPage.editPage.editImage')}
              </label>
              {productImage ? (
                <img
                  className="w-60"
                  src={URL.createObjectURL(productImage)}
                  alt={productName}
                />
              ) : (
                <img className="w-60" src={image} alt={productName} />
              )}
            </div>
            <div className="flex flex-row mt-5">
              <input
                type="file"
                name="image"
                id="image"
                accept=".png, .jpg"
                multiple={false}
                onChange={(event) => {
                  setProductImage(event.target.files[0]);
                }}
              />
            </div>
          </div>
          <Button className={'mt-12'} type="edit"></Button>
        </form>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(ProductEdit);
