import React, { FC } from 'react';
import { Form, Formik, ErrorMessage, FormikHelpers, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../hooks';
import {
  addService,
  changeService,
} from '../../../redux/reducers/servicesReducer';
import { IService } from '../../../commonInterfaces/IService';
import { IFormServiceState } from './IFormService';
import { StyledLabel } from '../../../commonStyles/StyledLabel';
import { StyledField } from '../../../commonStyles/StyledField';
import { StyledErrorMessage } from '../../../commonStyles/StyledErrorMessage';
import { StyledButton } from '../../../commonStyles/StyledButton';
import { IMaterial } from '../../../commonInterfaces/IMaterial';

const FormService: FC<IFormServiceState> = ({ service, hideFormHandler }) => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{
        name: service?.name || '',
        measure: service?.measure || '',
        materials: service?.materials || [],
        price: service?.price || 0,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Введите название услуги'),
        measure: Yup.string().required(
          'Укажите меру за которую выставлена цена',
        ),
        materials: Yup.array().nullable(),
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
      {({ values }) => (
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
                {values.materials?.map((material: IMaterial, index: number) => (
                  <div key={index}>
                    <StyledLabel htmlFor={`materials.${index}`}>
                      Материалы
                    </StyledLabel>
                    <StyledField
                      id={`materials.${index}`}
                      type="text"
                      name={`materials.${index}`}
                    />
                    <ErrorMessage name={`materials.${index}`}>
                      {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
                    </ErrorMessage>
                    <StyledButton type="button" onClick={() => remove(index)}>
                      X
                    </StyledButton>
                    <StyledButton type="button" onClick={() => push('')}>
                      Добавить материал
                    </StyledButton>
                  </div>
                ))}
              </div>
            )}
          </FieldArray>

          <StyledLabel htmlFor="price">Цена</StyledLabel>
          <StyledField id="price" type="text" name="price" />
          <ErrorMessage name="price">
            {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
          <StyledButton type="submit">
            {service ? 'Сохранить' : 'Добавить услугу'}
          </StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default FormService;
