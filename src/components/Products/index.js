import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../utilities/Button';

function Products() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tmpData = [
    {
      id: 1,
      name: 'Super Burger',
      description: 'Un délicieux burger',
      image: '',
      productType: 0,
      discount: 0,
      price: 5.99
    },
    {
      id: 2,
      name: 'Mega Burger',
      description: 'Un Mega délicieux burger',
      image: '',
      productType: 0,
      discount: 0,
      price: 6.99
    }
  ];

  return (
    <div>
      <h1 className="text-4xl text-goodFoodRed-500 font-bold">
        {t('productsPage.title')}
      </h1>
      <p className="text-goodFoodMustard-500 font-semibold mt-6">
        {t('productsPage.description')}
      </p>
      <div className="flex flex-row mt-8">
        {tmpData.map((product) => {
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
                  onClick={() => {
                    navigate(`/products/edit/${product.id}`);
                  }}
                  type="edit"
                ></Button>
              </div>
            </div>
          );
        })}
      </div>
      <Button className={'mt-6'} type="addProduct"></Button>
    </div>
  );
}

export default Products;
