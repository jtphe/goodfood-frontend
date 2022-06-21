import React from 'react';
import PropTypes from 'prop-types';
import Orders from 'components/Orders';
import Suppliers from 'components/Suppliers';
import Products from 'components/Products';
import Management from 'components/Management';
import Parameters from 'components/Parameters';

function CurrentScreen({ currentScreen }) {
  function _renderRightScreen() {
    switch (currentScreen) {
      case 'orders':
        return <Orders />;
      case 'suppliers':
        return <Suppliers />;
      case 'products':
        return <Products />;
      case 'management':
        return <Management />;
      case 'parameters':
        return <Parameters />;
    }
  }

  return <div>{_renderRightScreen()}</div>;
}

CurrentScreen.propTypes = {
  currentScreen: PropTypes.string
};

export default CurrentScreen;
