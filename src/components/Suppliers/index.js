import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { getSuppliers } from 'store/modules/supplier/selectors';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import { loadSuppliers } from 'store/modules/supplier/actions';

const mapStateToProps = createSelector([getSuppliers], (suppliers) => {
  return { suppliers };
});

function Suppliers({ suppliers }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(loadSuppliers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="text-4xl text-goodFoodRed-500 font-bold">
        {t('suppliersPage.title')}
      </h1>
      <p className="text-goodFoodMustard-500 font-semibold mt-6">
        {t('suppliersPage.description')}
      </p>
      <div className="flex flex-row mt-8">
        {/* map here */}
        {suppliers.map((supplier) => {
          return (
            <div
              key={supplier.id}
              className="bg-white p-6 first:ml-0 m-4 w-40 justify-items-center text-center rounded-xl drop-shadow-xl"
              onClick={() => {
                navigate(`/suppliers/${supplier.id}`);
              }}
            >
              <h3 className="font-black text-goodFoodMustard-500 select-none">
                {supplier.type}
              </h3>
              <h3 className="mt-2 font-black text-goodFoodRed-500 select-none">
                {supplier.name}
              </h3>
            </div>
          );
        })}
      </div>
    </>
  );
}

Suppliers.propTypes = {
  suppliers: PropTypes.array,
  currentScreen: PropTypes.string
};

export default connect(mapStateToProps)(Suppliers);
