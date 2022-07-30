import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { getSuppliers } from 'store/modules/supplier/selectors';

const mapStateToProps = createSelector([getSuppliers], (suppliers) => {
  return { suppliers };
});
function SupplierDetails({ suppliers }) {
  const { id } = useParams();
  const idNumber = parseInt(id);
  const supplierDetails = suppliers.find(
    (supplier) => supplier.id === idNumber
  );

  console.log(`id: ${id}`);
  console.log(typeof id);
  console.log(`suppliers`);
  console.log(supplierDetails);

  return <h1>Details</h1>;
}

SupplierDetails.propTypes = {
  suppliers: PropTypes.array
};

export default connect(mapStateToProps)(SupplierDetails);
