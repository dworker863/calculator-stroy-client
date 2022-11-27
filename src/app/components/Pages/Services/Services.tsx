import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  removeService,
  setError,
} from '../../../redux/reducers/servicesReducer';
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
  const { services, errorMessage } = useAppSelector(
    ({ servicesReducer }) => servicesReducer,
  );
  const cart = useAppSelector(({ cartReducer }) => cartReducer);
  const dispatch = useAppDispatch();

  const [serviceName, setServiceName] = useState('');
  const [showForm, setShowForm] = useState<any>(null);

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
    dispatch(setError(''));
  };

  const deleteServiceHandler = (id: number | undefined) => {
    dispatch(removeService(id));
    dispatch(setError(''));
  };

  const addServiceHandler = () => {
    setShowForm('');
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
    setShowForm(null);
  };

  console.log(errorMessage);

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
      {isAdmin && (
        <button
          type="button"
          onClick={() =>
            deleteServiceHandler(
              services.filter((service) => service.name === serviceName)[0].id,
            )
          }
        >
          Удалить
        </button>
      )}
      {isAdmin && (
        <button type="button" onClick={addServiceHandler}>
          Добавить Услугу
        </button>
      )}
      {showForm !== null && (
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
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default Services;
