import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setCartService, setSum } from '../../../redux/reducers/cartReducer';
import { getServices } from '../../../redux/reducers/servicesReducer';
import Cart from '../../Blocks/Cart/Cart';
import AdminInstanceForm from '../../Blocks/AdminInstanceForm/AdminInstanceForm';

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
  }, [dispatch]);

  // const setCartServiceHandler = () => {
  //   dispatch(
  //     setCartService(
  //       services.filter((service) => service.name === serviceName)[0],
  //     ),
  //   );
  //   dispatch(setSum());
  // };

  return (
    <div>
      {isAdmin && <AdminInstanceForm instances={services} type="services" />}
      {isAdmin && <AdminInstanceForm instances={materials} type="materials" />}

      {/* {!isAdmin && (
        <StyledButton type="button" onClick={setCartServiceHandler}>
          Выбрать услугу
        </StyledButton>
      )} */}
      {!isAdmin && <Cart />}
      {serviceError && <div>{serviceError}</div>}
      {materialError && <div>{materialError}</div>}
    </div>
  );
};

export default Services;
