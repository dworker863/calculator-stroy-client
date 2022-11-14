import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';

const FormRegistration = () => {
  return (
    <Formik
      initialValues={{
        username: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: '',
        email: null,
      }}
      validationSchema={Yup.object({
        username: Yup.string().required('Введите имя пользователя'),
        phoneNumber: Yup.string().required('Введите номер телефона'),
        password: Yup.string().required('Введите пароль'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password')], 'Пароли не совпадают')
          .required('Подтвердите пароль'),
        email: Yup.string().email('Введите корректный email').nullable(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);

        setSubmitting(false);
      }}
    >
      <Form>
        <label htmlFor="username">Имя пользователя</label>
        <Field id="username" type="text" name="username" />
        <ErrorMessage name="username" />

        <label htmlFor="phoneNumber">Номер телефона</label>
        <Field id="phoneNumber" type="text" name="phoneNumber" />
        <ErrorMessage name="phoneNumber" />

        <label htmlFor="password">Пароль</label>
        <Field id="password" type="password" name="password" />
        <ErrorMessage name="password" />

        <label htmlFor="passwordConfirm">Подтвердите пароль</label>
        <Field id="passwordConfirm" type="password" name="passwordConfirm" />
        <ErrorMessage name="passwordConfirm" />

        <label htmlFor="email">Email</label>
        <Field id="email" type="text" name="email" />
        <ErrorMessage name="email" />

        <button type="submit">Зарегистрироваться</button>
      </Form>
    </Formik>
  );
};

export default FormRegistration;
