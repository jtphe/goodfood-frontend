import React from 'react';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from './utilitaryFunctions';

function Button({ type, onClick, className }) {
  const { t } = useTranslation();

  const setBtnColor = () => {
    if (type === 'processing') {
      return 'bg-cyan-500 hover:bg-cyan-700 text-white';
    } else if (type === 'delivering') {
      return 'bg-yellow-500 hover:bg-yellow-700 text-white';
    } else if (type === 'delivered') {
      return 'bg-green-500 hover:bg-green-700 text-white';
    } else if (type === 'edit') {
      return 'bg-goodFoodMustard-500 text-white';
    } else if (type === 'addProduct') {
      return 'bg-goodFoodGreen-100 hover:bg-goodFoodGreen-500 text-white';
    } else if (type === 'add') {
      return 'bg-goodFoodGreen-100 hover:bg-goodFoodGreen-500 text-white';
    } else if (type === 'next') {
      return 'bg-goodFoodGreen-100 hover:bg-goodFoodGreen-500 text-white';
    }
  };

  const setBtnText = () => {
    return capitalizeFirstLetter(t(`utilities.button.${type}`));
  };

  return (
    <button
      className={`${setBtnColor()} font-bold py-2 px-4 rounded-lg w-40 ${className}`}
      onClick={onClick}
    >
      {setBtnText()}
    </button>
  );
}

Button.propTypes = {
  type: propTypes.string.isRequired,
  onClick: propTypes.func,
  className: propTypes.string
};

export default Button;
