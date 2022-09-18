import React from 'react';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from './utilitaryFunctions';

function Button({ type, onClick, className }) {
  const { t } = useTranslation();

  const setBtnColor = () => {
    if (type === 'processing') {
      return 'bg-goodFoodMustard-500 text-white shadow-md shadow-goodFoodMustard-500/50';
    } else if (type === 'delivering') {
      return 'bg-goodFoodGreen-100 text-white shadow-md shadow-goodFoodGreen-100/50';
    } else if (type === 'delivered') {
      return 'bg-goodFoodGreen-500 text-white shadow-md shadow-goodFoodGreen-500/50';
    } else if (type === 'edit') {
      return 'bg-goodFoodMustard-500 text-white';
    } else if (type === 'addProduct') {
      return 'bg-goodFoodGreen-100 hover:bg-goodFoodGreen-500 text-white';
    } else if (type === 'add') {
      return 'bg-goodFoodGreen-100 hover:bg-goodFoodGreen-500 text-white';
    } else if (type === 'next') {
      return 'bg-goodFoodBlue-500 text-white';
    } else if (type === 'update') {
      return 'bg-goodFoodGreen-500 text-white';
    } else if (type === 'addStaff') {
      return 'bg-goodFoodGreen-500 text-white';
    } else if (type === 'delete') {
      return 'bg-goodFoodRed-500 text-white';
    } else if (type === 'details') {
      return 'bg-goodFoodRed-500 text-white';
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
