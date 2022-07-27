import React from 'react';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function Button({ type }) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const { t } = useTranslation();

  const setBtnColor = (type) => {
    if (type === 'processing') {
      return 'bg-cyan-500 hover:bg-cyan-700 text-white';
    } else if (type === 'delivering') {
      return 'bg-yellow-500 hover:bg-yellow-700 text-white';
    } else if (type === 'delivered') {
      return 'bg-green-500 hover:bg-green-700 text-white';
    }
  };

  const setBtnText = (type) => {
    return capitalizeFirstLetter(t(`utilities.button.${type}`));
  };

  return (
    <button
      className={`${setBtnColor(type)} font-bold py-2 px-4 rounded-full w-40`}
    >
      {setBtnText(type)}
    </button>
  );
}

Button.propTypes = {
  type: propTypes.string.isRequired
};

export default Button;
