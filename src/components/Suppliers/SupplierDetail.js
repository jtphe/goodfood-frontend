import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { getSuppliers } from 'store/modules/supplier/selectors';
import { useTranslation } from 'react-i18next';

const mapStateToProps = createSelector([getSuppliers], (suppliers) => {
  return { suppliers };
});
function SupplierDetail({ suppliers }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const idNumber = parseInt(id);
  const supplierDetails = suppliers.find(
    (supplier) => supplier.id === idNumber
  );

  return (
    <>
      <button
        className="text-goodFoodRed-500 font-bold mb-8 text-left text-xl"
        onClick={() => navigate(-1)}
      >
        {'<'} {t('utilities.return')}
      </button>
      <h1 className="text-4xl mt-4 text-goodFoodRed-500 font-bold">
        {supplierDetails.name}
      </h1>
      <h2 className="text-3xl mt-3 text-goodFoodMustard-500 font-bold">
        {t('suppliersPage.supplierDetail.supplier', {
          type: supplierDetails.type
        })}
      </h2>
      <p className="text-xl mt-5 text-neutral-800">
        {t('suppliersPage.supplierDetail.deliveryAddress', {
          address: supplierDetails.address
        })}
      </p>
      <div className="border-b-2 mt-3 border-neutral-800"></div>
      <p className="text-xl mt-3 text-neutral-800">
        {t('suppliersPage.supplierDetail.phoneNumber', {
          phone: supplierDetails.phone
        })}
      </p>
      <p className="text-xl text-neutral-800">
        {t('suppliersPage.supplierDetail.manager', {
          contact: supplierDetails.contact
        })}
      </p>
    </>
  );
}

SupplierDetail.propTypes = {
  suppliers: PropTypes.array
};

export default connect(mapStateToProps)(SupplierDetail);
