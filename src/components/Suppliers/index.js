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

function Suppliers({ suppliers, currentScreen }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(loadSuppliers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ml-12">
      <h1 className="text-3xl mt-16 text-goodFoodRed-500 font-bold">
        {t('suppliersPage.title')}
      </h1>
      <p className="text-goodFoodMustard-500 font-semibold mt-6">
        {t('suppliersPage.description')}
      </p>
      <SuppliersList suppliers={suppliers} currentScreen={currentScreen} />
    </div>
  );
}

function SuppliersList({ suppliers }) {
  const navigate = useNavigate();
  const supplierItems = suppliers.map((supplier, index) => (
    <div
      key={index}
      className="bg-white p-6 first:ml-0 m-4 w-40 justify-items-center text-center rounded-xl drop-shadow-xl"
    >
      <h3 className="font-black text-goodFoodMustard-500 select-none">
        {supplier.type}
      </h3>
      <h3 className="mt-2 font-black text-goodFoodRed-500 select-none">
        {supplier.name}
      </h3>
      <button
        onClick={() => navigate(`/suppliers/${supplier.id}`)}
        to={`${supplier.id}`}
      >
        <span>Click</span>
      </button>
      ;
    </div>
  ));

  return <div className="flex flex-row mt-8">{supplierItems}</div>;
}

Suppliers.propTypes = {
  suppliers: PropTypes.array,
  currentScreen: PropTypes.string
};

SuppliersList.propTypes = {
  suppliers: PropTypes.array,
  currentScreen: PropTypes.string
};

export default connect(mapStateToProps)(Suppliers);
