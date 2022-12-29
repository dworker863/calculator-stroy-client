import React, { FC } from 'react';
import { Form, Formik, ErrorMessage, FormikHelpers, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  addService,
  changeService,
  setServicesError,
} from '../../../redux/reducers/servicesReducer';
import { IService } from '../../../commonInterfaces/IService';
import { IFormServiceState } from './IFormService';
import { StyledLabel } from '../../../commonStyles/StyledLabel';
import { StyledField } from '../../../commonStyles/StyledField';
import { StyledErrorMessage } from '../../../commonStyles/StyledErrorMessage';
import { IMaterial } from '../../../commonInterfaces/IMaterial';
import Button from '../../Elements/Button/Button';

const FormService: FC<IFormServiceState> = ({ service, hideFormHandler }) => {
  const dispatch = useAppDispatch();
  const { materials, materialError } = useAppSelector(
    ({ materialsReducer }) => materialsReducer,
  );

  console.log(service.materials);

  return (
    <Formik
      initialValues={{
        name: service?.name || '',
        measure: service?.measure || '',
        materials:
          (service?.materials.length > 0 &&
            service?.materials.map(
              (material: IMaterial, index: number) => material.id,
            )) ||
          [],
        // (materials.length > 0 ? [materials[0].id] : []),
        price: service?.price || 0,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Введите название услуги'),
        measure: Yup.string().required(
          'Укажите меру за которую выставлена цена',
        ),
        materials: Yup.array()
          .of(Yup.number())
          .nullable()
          .test(
            'unique',
            'Материалы не должны повторяться',
            (values) => new Set(values).size === values?.length,
          ),
        price: Yup.number().required('Укажите цену'),
      })}
      onSubmit={(values: IService, { setSubmitting }: FormikHelpers<any>) => {
        console.log(values);

        if (service) {
          dispatch(changeService(service.id, values));
        } else {
          dispatch(addService(values));
        }

        hideFormHandler();
        setSubmitting(false);
      }}
      enableReinitialize
    >
      {({ values, setFieldError, setFieldValue, getFieldProps }) => (
        <Form>
          <StyledLabel htmlFor="name">Название услуги</StyledLabel>
          <StyledField id="name" type="text" name="name" />
          <ErrorMessage name="name">
            {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>

          <StyledLabel htmlFor="measure">Мера</StyledLabel>
          <StyledField id="measure" type="text" name="measure" />
          <ErrorMessage name="measure">
            {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
          <FieldArray name="materials">
            {({ insert, remove, push }) => (
              <div>
                {materials.length > 0 &&
                  values.materials?.map((value: any, index: number) => (
                    <div key={index}>
                      <StyledLabel htmlFor={`materials.${index}`}>
                        Материалы
                      </StyledLabel>
                      <StyledField
                        component="select"
                        id={`materials.${index}`}
                        name={`materials.${index}`}
                      >
                        {materials.map((material, index) => (
                          <option
                            key={material.name + index}
                            value={material.id}
                          >
                            {material.name}
                          </option>
                        ))}
                      </StyledField>
                      <Button
                        type="button"
                        text="X"
                        onClick={() => {
                          remove(index);
                        }}
                        inline
                      />
                      <Button
                        type="button"
                        text="Добавить материал"
                        onClick={() => {
                          console.log(values.materials);
                          console.log(value);
                          push(value);
                        }}
                      />
                    </div>
                  ))}
                {values.materials.length === 0 && (
                  <Button
                    type="button"
                    text="Добавить материал"
                    onClick={() => {
                      dispatch(setServicesError(''));
                      push(materials[0].id);
                      console.log(values.materials);
                    }}
                  />
                )}
              </div>
            )}
          </FieldArray>
          <ErrorMessage name="materials">
            {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>

          <StyledLabel htmlFor="price">Цена</StyledLabel>
          <StyledField id="price" type="text" name="price" />
          <ErrorMessage name="price">
            {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
          <Button type="submit" text={service ? 'Изменить' : 'Сохранить'} />
        </Form>
      )}
    </Formik>
  );
};

export default FormService;
