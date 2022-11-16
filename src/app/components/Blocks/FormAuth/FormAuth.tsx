import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  yupToFormErrors,
} from 'formik';
import { IFormAuthValues } from './IFormAuth';
import React, { FC } from 'react';
import * as Yup from 'yup';

const FormAuth: FC = () => {
  return (
    <Formik
      initialValues={{
        phoneNumber: '',
        password: '',
      }}
      validationSchema={Yup.object({
        phoneNumber: Yup.string().required('Введите номер телефона'),
        password: Yup.string().required('Введите номер пароль'),
      })}
      onSubmit={(
        values: IFormAuthValues,
        { setSubmitting }: FormikHelpers<IFormAuthValues>,
      ) => {
        setSubmitting(false);
      }}
    >
      <Form>
        <label htmlFor="name">Номер телефона</label>
        <Field id="name" type="text" name="name" />
        <ErrorMessage name="name" />

        <label htmlFor="name">Пароль</label>
        <Field id="name" type="text" name="name" />
        <ErrorMessage name="name" />

        <button type="submit">Войти</button>
      </Form>
    </Formik>
  );
};

export default FormAuth;
