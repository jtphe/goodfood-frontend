import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getToken } from 'store/modules/user/selectors';
import { getCurrentScreen } from 'store/modules/app/selectors';
import PropTypes from 'prop-types';
import Menu from 'components/Home/Menu';
import CurrentScreen from 'components/Home/CurrentScreen';

const mapStateToProps = createSelector(
  [getCurrentScreen, getToken],
  (currentScreen, token) => ({
    currentScreen,
    isLoggedIn: token !== null
  })
);

function Home({ currentScreen, isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <div className="flex flex-row">
      <Menu currentScreen={currentScreen} />
      <CurrentScreen currentScreen={currentScreen} />
    </div>
  );
}

Home.propTypes = {
  currentScreen: PropTypes.string,
  isLoggedIn: PropTypes.bool
};

export default connect(mapStateToProps)(Home);
