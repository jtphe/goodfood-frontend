import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from 'components/utilities/utilitaryFunctions';
import Button from '../utilities/Button';

function ProductAdd() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <button
        className="text-goodFoodRed-500 font-bold mb-16"
        onClick={() => navigate(-1)}
      >
        {'<'} {capitalizeFirstLetter(t('utilities.return'))}
      </button>
      <div>
        <h1 className="text-4xl text-goodFoodRed-500 font-bold mb-14">
          {t('productsPage.addPage.title')}
        </h1>
        <form onSubmit="" method="POST">
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
              <input
                className="mr-2"
                type="radio"
                name="type"
                id="burger"
                value="burger"
              />
              <select name="type" id="foodType" className="p-2">
                <option value="burger">Burger</option>
                <option value="tacos">Tacos</option>
                <option value="pizza">Pizza</option>
              </select>
              <br />
              <input
                type="radio"
                id="snack"
                name="type"
                value="snack"
                className="mr-2"
              />
              <label htmlFor="snack">Snack</label>
              <br />
              <input
                type="radio"
                id="drink"
                name="type"
                value="drink"
                className="mr-2"
              />
              <label htmlFor="drink">Boisson</label>
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
            <div className="flex flex-row mt-5">
              <label htmlFor="image" className="mr-3">
                {t('productsPage.addPage.productImage')}
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept=".png, .jpg"
                multiple="false"
              />
            </div>
          </div>
          <Button className={'mt-12'} type="add"></Button>
        </form>
      </div>
    </>
  );
}

export default ProductAdd;
