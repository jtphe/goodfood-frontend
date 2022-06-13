import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getCurrentScreen } from '../store/modules/app/selectors';
import Orders from './Orders';
import PropTypes from 'prop-types';

const mapStateToProps = createSelector([getCurrentScreen], currentScreen => {
    return {
        currentScreen
    }
})
function CurrentScreen({ currentScreen }){
    console.log('currentScreen', currentScreen)

    return(
        <div><Orders/></div>
    )
}

CurrentScreen.propTypes = {
    currentScreen: PropTypes.string
  }
  

export default connect(mapStateToProps)(CurrentScreen);