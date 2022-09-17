import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'store/modules/app/actions';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { TbBuildingWarehouse } from 'react-icons/tb';
import { FaUsers, FaDoorOpen } from 'react-icons/fa';
import { ImSpoonKnife } from 'react-icons/im';
import { IoMdSettings } from 'react-icons/io';

function Menu({ role, firstname, lastname, restaurant }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isManager = useMemo(() => {
    return role === 'manager';
  }, [role]);

  const _logout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col w-1/4 px-4 py-8 border-r bg-goodFoodGrey-500">
      <div className="flex items-center justify-center">
        <img
          src="/logo_corporate.png"
          alt="good food logo corporate"
          width="150px"
        />
      </div>
      <aside className="mt-10">
        <div className="ml-3 my-8">
          <h1 className="text-xl text-goodFoodRed-500 font-bold">
            {t('menu.welcome', { firstname, lastname })}
          </h1>
          <h1 className="mt-2 text-l text-goodFoodMustard-500 font-bold">
            {restaurant.name}
          </h1>
        </div>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                'flex items-center pl-3 pr-4 py-2 text-xl' +
                (!isActive ? ' opacity-50' : ' text-goodFoodRed-500')
              }
              to="orders"
            >
              <HiOutlineClipboardList size={26} />
              <span className=" ml-3.5 font-medium">
                {t('navigation.orders')}
              </span>
            </NavLink>
          </li>
          {isManager ? (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    'flex items-center px-4 py-2 text-xl' +
                    (!isActive ? ' opacity-50' : ' text-goodFoodRed-500')
                  }
                  to="products"
                >
                  <ImSpoonKnife size={20} />
                  <span className="mx-4 font-medium">
                    {t('navigation.products')}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    'flex items-center px-4 py-2 text-xl' +
                    (!isActive ? ' opacity-50' : ' text-goodFoodRed-500')
                  }
                  to="suppliers"
                >
                  <FaUsers size={22} />
                  <span className="mx-4 font-medium">
                    {t('navigation.suppliers')}
                  </span>
                </NavLink>
              </li>
            </>
          ) : null}
          <li>
            <NavLink
              className={({ isActive }) =>
                'flex items-center px-4 py-2 text-xl' +
                (!isActive ? ' opacity-50' : ' text-goodFoodRed-500')
              }
              to="management"
            >
              <TbBuildingWarehouse size={22} />
              <span className="mx-4 font-medium">
                {t('navigation.management')}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                'flex items-center px-4 py-2 text-xl' +
                (!isActive ? ' opacity-50' : ' text-goodFoodRed-500')
              }
              to="parameters"
            >
              <IoMdSettings size={22} />
              <span className="mx-4 font-medium">
                {t('navigation.parameters')}
              </span>
            </NavLink>
          </li>
          <div>
            <li className="absolute bottom-10">
              <NavLink
                onClick={() => _logout()}
                className={() =>
                  'flex items-center px-4 py-4 bg-goodFoodRed-500 rounded-md text-white justify-between transition ease-in-out delay-100 hover:opacity-80 ml-12'
                }
                to="login"
              >
                <span className="mr-4 font-medium">
                  {t('navigation.logout')}
                </span>
                <FaDoorOpen size={22} />
              </NavLink>
            </li>
          </div>
        </ul>
      </aside>
    </div>
  );
}

export default Menu;
