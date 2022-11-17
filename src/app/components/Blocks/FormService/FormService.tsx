import React, { FC } from 'react';
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../hooks';
import { addService } from '../../../redux/reducers/servicesReducer';
import { IFormServiceValues } from './IFormService';

const FormService: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{
        name: '',
        measure: '',
        material: [],
        color: [],
        price: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Введите название услуги'),
        measure: Yup.string().required(
          'Укажите меру за которую выставлена цена',
        ),
        material: Yup.array().nullable(),
        color: Yup.array().nullable(),
        price: Yup.string().required('Укажите цену'),
      })}
      onSubmit={(
        values: IFormServiceValues,
        { setSubmitting }: FormikHelpers<any>,
      ) => {
        dispatch(addService(values));
        setSubmitting(false);
      }}
    >
      <Form>
        <label htmlFor="name">Название услуги</label>
        <Field id="name" type="text" name="name" />
        <ErrorMessage name="name" />

        <label htmlFor="measure">Мера</label>
        <Field id="measure" type="text" name="measure" />
        <ErrorMessage name="measure" />

        <label htmlFor="material">Материалы</label>
        <Field id="material" type="text" name="material" />
        <ErrorMessage name="material" />

        <label htmlFor="color">Цвета</label>
        <Field id="color" type="text" name="color" />
        <ErrorMessage name="color" />

        <label htmlFor="price">Цена</label>
        <Field id="price" type="text" name="price" />
        <ErrorMessage name="price" />
        <button type="submit">Добавить услугу</button>
      </Form>
    </Formik>
  );
};

export default FormService;
