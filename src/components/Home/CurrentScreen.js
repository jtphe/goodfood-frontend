import React from 'react';
import Orders from '../Orders';
import Suppliers from '../Suppliers';
import Products from '../Products';
import Management from '../Management';
import Parameters from '../Parameters';
import PropTypes from 'prop-types';

function CurrentScreen({ currentScreen }){

    const _renderRightScreen = () => {
        switch(currentScreen){
            case 'orders':
                return <Orders/>;
            case 'suppliers':
                return <Suppliers/>;
            case 'products':
                return <Products/>;
            case 'management':
                return <Management/>;
            case 'parameters':
                return <Parameters/>;

        }
    }

    return(
        <div>{_renderRightScreen()}</div>
    )
}

CurrentScreen.propTypes = {
    currentScreen: PropTypes.string
}

export default CurrentScreen;