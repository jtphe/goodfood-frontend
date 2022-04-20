import React from 'react';
import { useTranslation } from 'react-i18next';

function Suppliers() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('suppliersPage.title')}</h1>
    </div>
  );
}

export default Suppliers;
