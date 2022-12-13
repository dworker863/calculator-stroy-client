import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getServices } from '../../../redux/reducers/servicesReducer';
import Cart from '../../Blocks/Cart/Cart';
import AdminInstanceForm from '../../Blocks/AdminInstanceForm/AdminInstanceForm';
import { getMaterials } from '../../../redux/reducers/materialsReducer';

const Services: FC = () => {
  const isAdmin = useAppSelector(({ authReducer }) => authReducer.isAdmin);
  const { services, serviceError } = useAppSelector(
    ({ servicesReducer }) => servicesReducer,
  );
  const { materials, materialError } = useAppSelector(
    ({ materialsReducer }) => materialsReducer,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServices());
    dispatch(getMaterials());
  }, [dispatch]);

  return (
    <div>
      <AdminInstanceForm
        isAdmin={isAdmin}
        instances={services}
        type="services"
      />
      {isAdmin && (
        <AdminInstanceForm
          isAdmin={isAdmin}
          instances={materials}
          type="materials"
        />
      )}

      {!isAdmin && <Cart />}
      {serviceError && <div>{serviceError}</div>}
      {materialError && <div>{materialError}</div>}
    </div>
  );
};

export default Services;
