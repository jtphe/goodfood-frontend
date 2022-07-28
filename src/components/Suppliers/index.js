import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import { getSuppliers } from 'store/modules/supplier/actions';
import { createSelector } from 'reselect';

const mapStateToProps = createSelector(getSuppliers, (suppliers) => {
  return suppliers;
});

function Suppliers({ suppliers }) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getSuppliers());
    console.log(suppliers);
  }, [dispatch, suppliers]);

  const tmpData = [
    { id: 1, supplierType: 'FOURNISSEUR VIANDE', supplierName: 'GFAIM' },
    { id: 2, supplierType: 'FOURNISSEUR VIANDE', supplierName: 'GFAIM' },
    { id: 3, supplierType: 'FOURNISSEUR VIANDE', supplierName: 'GFAIM' },
    { id: 4, supplierType: 'FOURNISSEUR VIANDE', supplierName: 'GFAIM' }
  ];

  return (
    <div className="ml-12">
      <h1 className="text-3xl mt-16 text-goodFoodRed-500 font-bold">
        {t('suppliersPage.title')}
      </h1>
      <p className="text-goodFoodMustard-500 font-semibold mt-6">
        {t('suppliersPage.description')}
      </p>
      <SuppliersList suppliers={tmpData} />
      <Outlet />
    </div>
  );
}

function SuppliersList(props) {
  const navigate = useNavigate();

  const _openSupplierDetails = (supplier) => {
    console.log('supplier', supplier);
    // Open the supplier details screen
    navigate('/suppliers/' + supplier.id, { replace: true });
  };

  const supplierItems = props.suppliers.map((supplier, index) => (
    <div
      key={index}
      className="bg-white p-6 first:ml-0 m-4 w-40 justify-items-center text-center rounded-xl drop-shadow-xl"
      onClick={() => _openSupplierDetails(supplier)}
    >
      <h3 className="font-black text-goodFoodMustard-500 select-none">
        {supplier.supplierType}
      </h3>
      <h3 className="mt-2 font-black text-goodFoodRed-500 select-none">
        {supplier.supplierName}
      </h3>
    </div>
  ));

  return <div className="flex flex-row mt-8">{supplierItems}</div>;
}

Suppliers.propTypes = {
  suppliers: PropTypes.array
};

SuppliersList.propTypes = {
  suppliers: PropTypes.array
};

export default connect(mapStateToProps)(Suppliers);
