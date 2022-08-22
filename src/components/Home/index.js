import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getToken } from 'store/modules/user/selectors';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import Menu from 'components/Home/Menu';

const mapStateToProps = createSelector([getToken], (token) => ({
  isLoggedIn: token !== null
}));

function Home({ isLoggedIn }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <div className="flex flex-row h-screen bg-goodFoodBeige-500">
      <Menu />
      <div className="flex flex-col overflow-y-auto w-5/6 ml-12 py-10">
        <ToastContainer />
        <Outlet />
      </div>
    </div>
  );
}

Home.propTypes = {
  currentScreen: PropTypes.string,
  isLoggedIn: PropTypes.bool
};

export default connect(mapStateToProps)(Home);
