import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCurrentScreen } from 'store/modules/app/actions';
import { logout } from 'store/modules/app/actions';

function Menu({ currentScreen }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const _updateCurrentScreen = (screen) => {
    if (currentScreen !== screen) {
      const payload = {
        screen
      };
      dispatch(updateCurrentScreen({ payload }));
    }
  };

  const _logout = () => {
    console.log('logout in menu');
    dispatch(logout());
  };

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto border-r bg-goodFoodGrey-500">
      <div className="flex items-center justify-center">
        <img
          src="./logo_corporate.png"
          alt="good food logo corporate"
          width="150px"
        />
      </div>
      <aside>
        <ul>
          <li>
            <NavLink
              onClick={() => _updateCurrentScreen('suppliers')}
              className={() =>
                'flex items-center px-4 py-2' +
                (currentScreen !== 'suppliers'
                  ? ' text-gray-900 hover:bg-red-400 hover:rounded-md hover:text-white'
                  : ' bg-red-400 rounded-md text-white')
              }
              to="suppliers"
            >
              <span className="mx-4 font-medium">
                {t('navigation.suppliers')}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => _updateCurrentScreen('orders')}
              className={() =>
                'flex items-center px-4 py-2' +
                (currentScreen !== 'orders'
                  ? ' text-gray-900 hover:bg-red-400 hover:rounded-md hover:text-white'
                  : ' bg-red-400 rounded-md text-white')
              }
              to="orders"
            >
              <span className="mx-4 font-medium">{t('navigation.orders')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => _updateCurrentScreen('products')}
              className={() =>
                'flex items-center px-4 py-2' +
                (currentScreen !== 'products'
                  ? ' text-gray-900 hover:bg-red-400 hover:rounded-md hover:text-white'
                  : ' bg-red-400 rounded-md text-white')
              }
              to="products"
            >
              <span className="mx-4 font-medium">
                {t('navigation.products')}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => _updateCurrentScreen('management')}
              className={() =>
                'flex items-center px-4 py-2' +
                (currentScreen !== 'management'
                  ? ' text-gray-900 hover:bg-red-400 hover:rounded-md hover:text-white'
                  : ' bg-red-400 rounded-md text-white')
              }
              to="management"
            >
              <span className="mx-4 font-medium">
                {t('navigation.management')}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => _updateCurrentScreen('parameters')}
              className={() =>
                'flex items-center px-4 py-2' +
                (currentScreen !== 'parameters'
                  ? ' text-gray-900 hover:bg-red-400 hover:rounded-md hover:text-white'
                  : ' bg-red-400 rounded-md text-white')
              }
              to="parameters"
            >
              <span className="mx-4 font-medium">
                {t('navigation.parameters')}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => _logout()}
              className={() =>
                'flex items-center px-4 py-2' +
                (currentScreen !== 'login'
                  ? ' text-gray-900 hover:bg-red-400 hover:rounded-md hover:text-white'
                  : ' bg-red-400 rounded-md text-white')
              }
              to="login"
            >
              <span className="mx-4 font-medium">logout</span>
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
}

Menu.propTypes = {
  currentScreen: PropTypes.string
};

export default Menu;
