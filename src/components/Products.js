import React from 'react';
import { useTranslation } from 'react-i18next';

function Products() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('productsPage.title')}</h1>
    </div>
  );
}

export default Products;
