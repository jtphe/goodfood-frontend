import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createSelector } from 'reselect';
import { getError } from 'store/modules/error/selectors';
import Button from '../utilities/Button';
import { toast } from 'react-toastify';
import { updateSupplier } from 'store/modules/supplier/actions';

const mapStateToProps = createSelector([getError], (error) => ({ error }));

function SupplierEdit() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id, name, type, address, phone, contact } = location.state;
  const [supplierName, setSupplierName] = useState(name);
  const [supplierType, setSupplierType] = useState(type);
  const [supplierAddress, setSupplierAddress] = useState(address);
  const [supplierPhone, setSupplierPhone] = useState(phone);
  const [supplierContact, setSupplierContact] = useState(contact);

  const _updateSupplier = async (event) => {
    event.preventDefault();
    let payload = {
      id: id,
      name: supplierName,
      type: supplierType,
      address: supplierAddress,
      phone: supplierPhone,
      contact: supplierContact,
      navigate: navigate,
      messageSuccess: t('toastify.supplierUpdate'),
      messageError: t('toastify.error')
    };
    if (
      supplierName === name &&
      supplierType === type &&
      supplierAddress === address &&
      supplierPhone === phone &&
      supplierContact === contact
    ) {
      toast.warn(t('error.nothingToUpdate'));
    } else {
      dispatch(updateSupplier({ payload }));
    }
  };

  function _handleInputChange(inputName, event) {
    const inputValue = event.target.value;
    switch (inputName) {
      case 'name':
        setSupplierName(inputValue);
        break;
      case 'type':
        setSupplierType(inputValue);
        break;
      case 'address':
        setSupplierAddress(inputValue);
        break;
      case 'phone':
        setSupplierPhone(inputValue);
        break;
      case 'contact':
        setSupplierContact(inputValue);
        break;
      default:
        return null;
    }
  }

  return (
    <>
      <button
        className="text-goodFoodRed-500 font-bold mb-8 text-left text-xl"
        onClick={() => navigate(-1)}
      >
        {'<'} {t('utilities.return')}
      </button>
      <div>
        <h1 className="text-4xl text-goodFoodRed-500 font-bold mb-14">
          {t('productsPage.editPage.title')}: {name}
        </h1>
        <form className="mb-10" onSubmit={_updateSupplier} method="POST">
          <div className="flex flex-col mt-6 w-2/4">
            <div className="flex flex-col">
              <label htmlFor="name">
                {t('productsPage.editPage.editName')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                name="name"
                id="name"
                value={supplierName}
                onChange={(e) => _handleInputChange('name', e)}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="type">
                {t('productsPage.editPage.editDescription')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                name="type"
                id="type"
                value={supplierType}
                onChange={(e) => _handleInputChange('type', e)}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="address" className="w-24 mr-3">
                {t('productsPage.editPage.editPrice')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                name="address"
                id="address"
                value={supplierAddress}
                onChange={(e) => _handleInputChange('address', e)}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="phone" className="w-24 mr-3">
                {t('productsPage.editPage.editDiscount')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                name="phone"
                id="phone"
                value={supplierPhone}
                onChange={(e) => _handleInputChange('phone', e)}
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="contact" className="w-24 mr-3">
                {t('productsPage.editPage.editDiscount')}
              </label>
              <input
                className="border py-2 px-3 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                name="contact"
                id="contact"
                value={supplierContact}
                onChange={(e) => _handleInputChange('contact', e)}
              />
            </div>
          </div>
          <Button className={'mt-12'} type="edit"></Button>
        </form>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(SupplierEdit);
