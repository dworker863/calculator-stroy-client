import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { StyledButton } from '../../../commonStyles/StyledButton';
import { StyledSelect } from '../../../commonStyles/StyledSelect';
import { useAppDispatch } from '../../../hooks';
import { setCartService, setSum } from '../../../redux/reducers/cartReducer';
import {
  removeService,
  setServicesError,
} from '../../../redux/reducers/servicesReducer';
import FormMaterial from '../../FormMaterial/FormMaterial';
import FormService from '../FormService/FormService';
import { IAdminInstanceFormState } from './IAdminInstanceForm';

const AdminInstanceForm: FC<IAdminInstanceFormState> = ({
  type,
  isAdmin,
  instances,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setInstanceName(instances[0]?.name);
  }, [instances]);

  const [instanceName, setInstanceName] = useState('');
  const [showForm, setShowForm] = useState<any>(null);

  const instanceSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (showForm) {
      setInstanceName(e.target.value);
      setShowForm(e.target.value);
    } else {
      setInstanceName(e.target.value);
    }
  };

  const addInstanceHandler = () => {
    setShowForm('');
  };

  const changeInstanceHandler = () => {
    setShowForm(instanceName);
  };

  const deleteServiceHandler = (id: number | undefined) => {
    dispatch(removeService(id));
    dispatch(setServicesError(''));
  };

  const hideFormHandler = () => {
    setShowForm(null);
  };

  const setCartServiceHandler = () => {
    if (type === 'services') {
      dispatch(
        setCartService(
          instances.filter((instance) => instance.name === instanceName)[0],
        ),
      );
    }
    dispatch(setSum());
  };

  console.log(instances[0]);

  return (
    <div>
      {instances.length > 0 && (
        <div>
          <StyledSelect
            name="instances"
            id="instnaces"
            onChange={instanceSelectHandler}
          >
            {instances.map((instance, index) => (
              <option key={instance.name + index}>{instance.name}</option>
            ))}
          </StyledSelect>
          {isAdmin && (
            <div>
              <StyledButton type="button" onClick={changeInstanceHandler}>
                Изменить
              </StyledButton>
              <StyledButton
                type="button"
                onClick={() =>
                  deleteServiceHandler(
                    instances.filter(
                      (instance) => instance.name === instanceName,
                    )[0].id,
                  )
                }
              >
                Удалить
              </StyledButton>
            </div>
          )}
        </div>
      )}
      {isAdmin && (
        <StyledButton type="button" onClick={addInstanceHandler}>
          {type === 'services' ? 'Добавить Услугу' : 'Добавить Материал'}
        </StyledButton>
      )}
      {showForm !== null &&
        (type === 'services' ? (
          <div>
            <FormService
              service={
                instances.filter((instance) => instance.name === showForm)[0]
              }
              hideFormHandler={hideFormHandler}
            />
            <StyledButton type="button" onClick={hideFormHandler}>
              Отмена
            </StyledButton>
          </div>
        ) : (
          <div>
            <FormMaterial
              material={
                instances.filter((instance) => instance.name === showForm)[0]
              }
              hideFormHandler={hideFormHandler}
            />
            <StyledButton type="button" onClick={hideFormHandler}>
              Отмена
            </StyledButton>
          </div>
        ))}
      {type === 'services' && (
        <StyledButton type="button" onClick={setCartServiceHandler}>
          Выбрать услугу
        </StyledButton>
      )}
    </div>
  );
};

export default AdminInstanceForm;
