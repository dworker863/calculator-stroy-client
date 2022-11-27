import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  removeCartService,
  setCartService,
  setSum,
} from '../../../redux/reducers/cartReducer';
import { getServices } from '../../../redux/reducers/servicesReducer';
import FormService from '../../Blocks/FormService/FormService';
import FormUserService from '../../Blocks/FormUserService/FormUserService';

const Services: FC = () => {
  const isAdmin = useAppSelector(({ authReducer }) => authReducer.isAdmin);
  const services = useAppSelector(
    ({ servicesReducer }) => servicesReducer.services,
  );
  const cart = useAppSelector(({ cartReducer }) => cartReducer);
  const dispatch = useAppDispatch();

  const [serviceName, setServiceName] = useState('');
  const [showForm, setShowForm] = useState('');

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    setServiceName(services[0]?.name);
  }, [services]);

  const setCartServiceHandler = () => {
    dispatch(
      setCartService(
        services.filter((service) => service.name === serviceName)[0],
      ),
    );
    dispatch(setSum());
  };

  const removeCartServiceHandler = (name: string) => {
    dispatch(removeCartService(name));
    dispatch(setSum());
  };

  const changeServiceHandler = () => {
    setShowForm(serviceName);
  };

  const serviceSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (showForm) {
      setServiceName(e.target.value);
      setShowForm(e.target.value);
    } else {
      setServiceName(e.target.value);
    }
  };

  const hideFormHandler = () => {
    setShowForm('');
  };

  return (
    <div>
      <select name="services" id="services" onChange={serviceSelectHandler}>
        {services.map((service, index) => (
          <option key={service.name + index}>{service.name}</option>
        ))}
      </select>
      {isAdmin && (
        <button type="button" onClick={changeServiceHandler}>
          Изменить
        </button>
      )}
      {isAdmin && <button type="button">Удалить</button>}
      {showForm && (
        <div>
          <FormService
            service={services.filter((service) => service.name === showForm)[0]}
            hideFormHandler={hideFormHandler}
          />
          <button type="button" onClick={hideFormHandler}>
            Отмена
          </button>
        </div>
      )}
      {!isAdmin && (
        <button type="button" onClick={setCartServiceHandler}>
          Выбрать услугу
        </button>
      )}
      {!isAdmin &&
        cart.cartServices.map((service, index) => (
          <div key={service.name + index}>
            <FormUserService service={service} />
            <button
              type="button"
              onClick={() => removeCartServiceHandler(service.name)}
            >
              X
            </button>
          </div>
        ))}
      {!isAdmin && (
        <div>
          <span>Сумма: </span>
          <span>{cart.sum}</span>
        </div>
      )}
    </div>
  );
};

export default Services;
