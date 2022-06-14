import React from 'react';
import Menu from './Menu';
import CurrentScreen from './CurrentScreen';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getCurrentScreen } from '../../store/modules/app/selectors';

const mapStateToProps = createSelector([getCurrentScreen], currentScreen => {
    return {
        currentScreen
    }
})

function Home({ currentScreen }){
    return (
    <div className="flex flex-row">
        <Menu currentScreen={currentScreen}/>
        <CurrentScreen currentScreen={currentScreen}/>
    </div>
    )
}

Home.propTypes = {
    currentScreen: PropTypes.string
}

export default connect(mapStateToProps)(Home);