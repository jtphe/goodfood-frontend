import React from 'react';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function Button({ type }) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const { t } = useTranslation();

  if (type === 'processing') {
    return (
      <button
        className={
          'bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full w-40'
        }
      >
        {capitalizeFirstLetter(t('utilities.button.processing'))}
      </button>
    );
  } else if (type === 'delivering') {
    return (
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-40">
        {capitalizeFirstLetter(t('utilities.button.delivering'))}
      </button>
    );
  } else if (type === 'delivered') {
    return (
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-40">
        {capitalizeFirstLetter(t('utilities.button.delivered'))}
      </button>
    );
  }
}

Button.propTypes = {
  type: propTypes.string.isRequired
};

export default Button;
