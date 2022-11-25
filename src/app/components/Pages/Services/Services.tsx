import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setCartService, setSum } from '../../../redux/reducers/cartReducer';
import { getServices } from '../../../redux/reducers/servicesReducer';
import FormUserService from '../../Blocks/FormUserService/FormUserService';

const Services: FC = () => {
  const isAdmin = useAppSelector(({ authReducer }) => authReducer.isAdmin);
  const services = useAppSelector(
    ({ servicesReducer }) => servicesReducer.services,
  );
  const cart = useAppSelector(({ cartReducer }) => cartReducer);
  const dispatch = useAppDispatch();

  const [serviceName, setServiceName] = useState('');

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    setServiceName(services[0]?.name);
  }, [services]);

  const setCartServiceHandler = () => {
    console.log(serviceName);
    dispatch(
      setCartService(
        services.filter((service) => service.name === serviceName)[0],
      ),
    );
    dispatch(setSum());
  };

  return (
    <div>
      <select
        name="services"
        id="services"
        onChange={(e) => setServiceName(e.target.value)}
      >
        {services.map((service, index) => (
          <option key={service.name + index}>{service.name}</option>
        ))}
      </select>
      {isAdmin && <button type="button">Изменить</button>}
      {isAdmin && <button type="button">Удалить</button>}
      {!isAdmin && (
        <button type="button" onClick={setCartServiceHandler}>
          Выбрать услугу
        </button>
      )}
      {cart.cartServices.map((service, index) => (
        <FormUserService key={service.name + index} service={service} />
      ))}
      <div>
        <span>Сумма: </span>
        <span>{cart.sum}</span>
      </div>
    </div>
  );
};

export default Services;
