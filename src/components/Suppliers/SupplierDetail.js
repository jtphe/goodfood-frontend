import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { getSuppliers } from 'store/modules/supplier/selectors';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from 'components/utilities/utilitaryFunctions';

const mapStateToProps = createSelector([getSuppliers], (suppliers) => {
  return { suppliers };
});
function SupplierDetail({ suppliers }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const idNumber = parseInt(id);
  const supplierDetails = suppliers.find(
    (supplier) => supplier.id === idNumber
  );

  return (
    <>
      <h1 className="text-4xl text-goodFoodRed-500 font-bold">
        {supplierDetails.name}
      </h1>
      <h2 className="text-3xl mt-3 text-goodFoodMustard-500 font-bold">
        {capitalizeFirstLetter(t('suppliersPage.supplierDetail.supplier'))}:
        {supplierDetails.type}
      </h2>
      <p className="text-xl mt-5 text-neutral-800">
        {capitalizeFirstLetter(
          t('suppliersPage.supplierDetail.deliveryAddress')
        )}
        :{supplierDetails.address}
      </p>
      <div className="border-b-2 mt-3 border-neutral-800"></div>
      <p className="text-xl mt-3 text-neutral-800">
        {capitalizeFirstLetter(t('suppliersPage.supplierDetail.phoneNumber'))}:{' '}
        {supplierDetails.phone}
      </p>
      <p className="text-xl text-neutral-800">
        {capitalizeFirstLetter(t('suppliersPage.supplierDetail.manager'))}:{' '}
        {supplierDetails.manager}
      </p>
    </>
  );
}

SupplierDetail.propTypes = {
  suppliers: PropTypes.array
};

export default connect(mapStateToProps)(SupplierDetail);
