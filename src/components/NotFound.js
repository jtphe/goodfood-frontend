import React from 'react';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex">
      <h1>{t('navigation.parameters')}</h1>
    </div>
  );
}

export default NotFound;
