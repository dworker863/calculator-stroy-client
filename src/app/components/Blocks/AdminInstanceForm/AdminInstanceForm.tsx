import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { StyledSelect } from '../../../commonStyles/StyledSelect';
import { useAppDispatch } from '../../../hooks';
import { setCartService, setSum } from '../../../redux/reducers/cartReducer';
import {
  removeMaterial,
  setMaterialsError,
} from '../../../redux/reducers/materialsReducer';
import {
  removeService,
  setServicesError,
} from '../../../redux/reducers/servicesReducer';
import FormMaterial from '../FormMaterial/FormMaterial';
import FormService from '../FormService/FormService';
import { IAdminInstanceFormState } from './IAdminInstanceForm';
import Button from '../../Elements/Button/Button';

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
    if (type === 'services') {
      setShowForm('');
      dispatch(setServicesError(''));
    } else {
      setShowForm('');
      dispatch(setMaterialsError(''));
    }
  };

  const changeInstanceHandler = () => {
    setShowForm(instanceName);
  };

  const deleteInstanceHandler = (id: number | undefined) => {
    if (type === 'services') {
      dispatch(removeService(id));
      dispatch(setServicesError(''));
    } else {
      dispatch(removeMaterial(id));
      dispatch(setMaterialsError(''));
    }
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
              <Button
                type="button"
                text="Изменить"
                onClick={changeInstanceHandler}
                inline
              />
              <Button
                type="button"
                text="Удалить"
                onClick={() =>
                  deleteInstanceHandler(
                    instances.filter(
                      (instance) => instance.name === instanceName,
                    )[0].id,
                  )
                }
                inline
              />
            </div>
          )}
        </div>
      )}
      {isAdmin && (
        <Button
          type="button"
          text={type === 'services' ? 'Добавить Услугу' : 'Добавить Материал'}
          onClick={addInstanceHandler}
        />
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
            <Button type="button" text="Отмена" onClick={hideFormHandler} />
          </div>
        ) : (
          <div>
            <FormMaterial
              material={
                instances.filter((instance) => instance.name === showForm)[0]
              }
              hideFormHandler={hideFormHandler}
            />
            <Button type="button" text="Отмена" onClick={hideFormHandler} />
          </div>
        ))}
      {!isAdmin && type === 'services' && instances.length > 0 && (
        <Button
          type="button"
          text="Выбрать услугу"
          onClick={setCartServiceHandler}
        />
      )}
    </div>
  );
};

export default AdminInstanceForm;
