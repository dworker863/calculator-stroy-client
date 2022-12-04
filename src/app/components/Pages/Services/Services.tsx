import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  removeService,
  setServicesError,
} from '../../../redux/reducers/servicesReducer';
import {
  removeCartService,
  setCartService,
  setSum,
} from '../../../redux/reducers/cartReducer';
import { getServices } from '../../../redux/reducers/servicesReducer';
import FormService from '../../Blocks/FormService/FormService';
import FormUserService from '../../Blocks/FormUserService/FormUserService';
import { StyledButton } from '../../../commonStyles/StyledButton';
import { StyledSelect } from '../../../commonStyles/StyledSelect';

const Services: FC = () => {
  const isAdmin = useAppSelector(({ authReducer }) => authReducer.isAdmin);
  const { services, serviceError } = useAppSelector(
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
    dispatch(setServicesError(''));
  };

  const deleteServiceHandler = (id: number | undefined) => {
    dispatch(removeService(id));
    dispatch(setServicesError(''));
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

  console.log(serviceError);

  return (
    <div>
      <StyledSelect
        name="services"
        id="services"
        onChange={serviceSelectHandler}
      >
        {services.map((service, index) => (
          <option key={service.name + index}>{service.name}</option>
        ))}
      </StyledSelect>
      {isAdmin && (
        <StyledButton type="button" onClick={changeServiceHandler}>
          Изменить
        </StyledButton>
      )}
      {isAdmin && (
        <StyledButton
          type="button"
          onClick={() =>
            deleteServiceHandler(
              services.filter((service) => service.name === serviceName)[0].id,
            )
          }
        >
          Удалить
        </StyledButton>
      )}
      {isAdmin && (
        <StyledButton type="button" onClick={addServiceHandler}>
          Добавить Услугу
        </StyledButton>
      )}
      {showForm !== null && (
        <div>
          <FormService
            service={services.filter((service) => service.name === showForm)[0]}
            hideFormHandler={hideFormHandler}
          />
          <StyledButton type="button" onClick={hideFormHandler}>
            Отмена
          </StyledButton>
        </div>
      )}
      {!isAdmin && (
        <StyledButton type="button" onClick={setCartServiceHandler}>
          Выбрать услугу
        </StyledButton>
      )}
      {!isAdmin &&
        cart.cartServices.map((service, index) => (
          <div key={service.name + index}>
            <FormUserService service={service} />
            <StyledButton
              type="button"
              onClick={() => removeCartServiceHandler(service.name)}
            >
              X
            </StyledButton>
          </div>
        ))}
      {!isAdmin && (
        <div>
          <span>Сумма: </span>
          <span>{cart.sum}</span>
        </div>
      )}
      {serviceError && <div>{serviceError}</div>}
    </div>
  );
};

export default Services;
