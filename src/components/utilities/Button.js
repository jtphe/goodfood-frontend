import React from 'react';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from './utilitaryFunctions';

function Button({ type }) {
  const { t } = useTranslation();

  const setBtnColor = () => {
    if (type === 'processing') {
      return 'bg-cyan-500 hover:bg-cyan-700 text-white';
    } else if (type === 'delivering') {
      return 'bg-yellow-500 hover:bg-yellow-700 text-white';
    } else if (type === 'delivered') {
      return 'bg-green-500 hover:bg-green-700 text-white';
    } else if (type === 'edit') {
      return 'bg-yellow-500 hover:bg-yellow-700 text-white';
    }
  };

  const setBtnText = () => {
    return capitalizeFirstLetter(t(`utilities.button.${type}`));
  };

  return (
    <button
      className={`${setBtnColor()} font-bold py-2 px-4 rounded-full w-40`}
    >
      {setBtnText()}
    </button>
  );
}

Button.propTypes = {
  type: propTypes.string.isRequired
};

export default Button;
