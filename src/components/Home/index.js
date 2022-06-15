import React, { useEffect } from 'react';
import Menu from './Menu';
import CurrentScreen from './CurrentScreen';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { getToken } from '../../store/modules/user/selectors';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getCurrentScreen } from '../../store/modules/app/selectors';

const mapStateToProps = createSelector([getCurrentScreen, getToken], (currentScreen, token) => {
    return {
        currentScreen,
        isLoggedIn: token !== null
    }
})

function Home({ currentScreen, isLoggedIn }){
    let navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/login", {replace: true});
        } 
    }, [isLoggedIn]);   

    return (
        <div className="flex flex-row">
            <Menu currentScreen={currentScreen}/>
            <CurrentScreen currentScreen={currentScreen}/>
        </div>
    )

}

Home.propTypes = {
    currentScreen: PropTypes.string,
    isLoggedIn: PropTypes.bool
}

export default connect(mapStateToProps)(Home);