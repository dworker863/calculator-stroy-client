import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { IFormAuthValues } from './IFormAuth';
import React, { FC } from 'react';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../hooks';
import { setLogin } from '../../../redux/reducers/authReducer';

const FormAuth: FC = () => {
  const dispatch = useAppDispatch();

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
      onSubmit={(values: IFormAuthValues, { setSubmitting }) => {
        dispatch(setLogin(values));
        setSubmitting(false);
      }}
    >
      <Form>
        <label htmlFor="phoneNumber">Номер телефона</label>
        <Field id="phoneNumber" type="text" name="phoneNumber" />
        <ErrorMessage name="phoneNumber" />

        <label htmlFor="password">Пароль</label>
        <Field id="password" type="password" name="password" />
        <ErrorMessage name="password" />

        <button type="submit">Войти</button>
      </Form>
    </Formik>
  );
};

export default FormAuth;
