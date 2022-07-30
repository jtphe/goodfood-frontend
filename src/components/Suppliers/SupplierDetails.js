import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

function SupplierDetails() {
  const { id } = useParams();
  console.log(id);
  return <h1>Details</h1>;
}

SupplierDetails.propTypes = {
  supplierDetails: PropTypes.object
};

export default SupplierDetails;
