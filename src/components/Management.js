import React from 'react';
import { useTranslation } from 'react-i18next';

function Management() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('managementPage.title')}</h1>
    </div>
  );
}

export default Management;
