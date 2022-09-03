import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../utilities/Button';

//TODO: Get product from Redux
function ProductEdit() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // TODO: Put the product current informations inside the placeholder
  // TODO: Have to handle the change of image file
  return (
    <>
      <button
        className="text-goodFoodRed-500 font-bold mb-16"
        onClick={() => navigate(-1)}
      >
        {'<'} {t('utilities.return')}
      </button>
      <div>
        <h1 className="text-4xl text-goodFoodRed-500 font-bold mb-14">
          {t('productsPage.editPage.title')}: PRODUCT NAME
        </h1>
        <form onSubmit="" method="POST">
          <div className="flex flex-col mt-6">
            <div className="flex flex-col">
              <label htmlFor="name">
                {t('productsPage.editPage.editName')}
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
                {t('productsPage.editPage.editDescription')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                name="description"
                id="description"
              />
            </div>
            <div className="flex flex-row mt-6 items-baseline text-right">
              <label htmlFor="price" className="w-24 mr-3">
                {t('productsPage.editPage.editPrice')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                name="price"
                id="price"
              />
            </div>
            <div className="flex flex-row  mt-6 items-baseline text-right">
              <label htmlFor="discount" className="w-24 mr-3">
                {t('productsPage.editPage.editDiscount')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                name="discount"
                id="discount"
              />
            </div>
            <div className="flex flex-row mt-5">
              <label htmlFor="image" className="mr-3">
                {t('productsPage.editPage.editImage')}
              </label>
              <img
                className="w-60"
                src="/burger_placeholder.jpg"
                alt="burger"
              />
            </div>
          </div>
          <Button className={'mt-12'} type="edit"></Button>
        </form>
      </div>
    </>
  );
}

export default ProductEdit;
