import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

function Menu() {
  const { t } = useTranslation();

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
              className={({ isActive }) =>
                'flex items-center px-4 py-2' +
                (!isActive
                  ? ' text-gray-900 hover:bg-red-400 hover:rounded-md hover:text-white'
                  : ' bg-red-400 rounded-md text-white')
              }
              // className="flex items-center px-4 py-2 text-gray-900 hover:bg-red-400 hover:rounded-md hover:text-white"
              to="suppliers"
            >
              <span className="mx-4 font-medium">
                {t('navigation.suppliers')}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                'flex items-center px-4 py-2' +
                (!isActive
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
              className={({ isActive }) =>
                'flex items-center px-4 py-2' +
                (!isActive
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
              className={({ isActive }) =>
                'flex items-center px-4 py-2' +
                (!isActive
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
              className={({ isActive }) =>
                'flex items-center px-4 py-2' +
                (!isActive
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
        </ul>
      </aside>
    </div>
  );
}

export default Menu;
