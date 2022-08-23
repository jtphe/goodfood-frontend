import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from './utilities/Button';

function Parameters() {
  const { t, i18n } = useTranslation();

  const _addNewMember = () => {};

  return (
    <div>
      <h1 className="text-4xl text-goodFoodRed-500 font-bold">
        {t('parametersPage.title')}
      </h1>
      <p className="py-6 text-goodFoodMustard-500 mb-12">
        {t('parametersPage.description')}
      </p>
      <h2 className="text-3xl text-goodFoodRed-500 font-bold mb-3">
        {t('parametersPage.languages')}
      </h2>
      <select
        name="productType"
        id="productType"
        className="mt-2 py-2 px-3 rounded-md border mb-12"
        onChange={(e) => {
          i18n.changeLanguage(e.target.value);
        }}
      >
        <option selected value="fr">
          {t('languages.french')}
        </option>
        <option value="en">{t('languages.english')}</option>
      </select>
      <div className={'flex flex-row justify-between'}>
        <h2 className="text-3xl text-goodFoodRed-500 font-bold mb-3">
          {t('parametersPage.membersList')}
        </h2>
        <Button
          type="add"
          className={'mr-12'}
          onClick={() => _addNewMember()}
        />
      </div>
      <div className="flex flex-row justify-between pb-4 border-b-2 pad mr-12 mt-8 pr-96">
        <h3>{t('parametersPage.name')}</h3>
        <h3>{t('parametersPage.firstname')}</h3>
        <h3>{t('parametersPage.mail')}</h3>
      </div>
    </div>
  );
}

export default Parameters;
