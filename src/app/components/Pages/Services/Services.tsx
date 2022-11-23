import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getServices } from '../../../redux/reducers/servicesReducer';

const Services: FC = () => {
  const isAdmin = useAppSelector(({ authReducer }) => authReducer.isAdmin);
  const services = useAppSelector(
    ({ servicesReducer }) => servicesReducer.services,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return (
    <div>
      <select name="services" id="services">
        {services.map((service, index) => (
          <option key={service.name + index}>{service.name}</option>
        ))}
      </select>
      {isAdmin && <button type="button">Изменить</button>}
      {isAdmin && <button type="button">Удалить</button>}
      {!isAdmin && <button type="button">Выбрать услугу</button>}
    </div>
  );
};

export default Services;
