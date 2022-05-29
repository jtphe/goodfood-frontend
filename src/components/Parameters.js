import React from 'react';
import { useTranslation } from 'react-i18next';

function Parameters() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <h1>{t('parametersPage.title')}</h1>
      <div className="flex flex-col justify-between mt-6 p-5">
        <div className="flex mb-5">
          <button
            className="bg-slate-300 py-2 px-5 mr-1 rounded-lg hover:bg-red-400 hover:text-white"
            onClick={() => changeLanguage('en')}
          >
            {t('languages.english')}
          </button>
          <button
            className="ml-4 bg-slate-300 py-2 px-5 rounded-lg hover:bg-red-400 hover:text-white"
            onClick={() => changeLanguage('fr')}
          >
            {t('languages.french')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Parameters;
