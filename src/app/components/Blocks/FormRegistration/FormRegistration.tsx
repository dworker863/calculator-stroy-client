import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import React, { FC } from 'react';
import { setRegistration } from '../../../redux/reducers/authReducer';
import { useAppDispatch } from '../../../hooks';
import { IFormRegistrationValues } from './IFormRegistration';
import { StyledLabel } from '../../../commonStyles/StyledLabel';
import { StyledField } from '../../../commonStyles/StyledField';
import { StyledErrorMessage } from '../../../commonStyles/StyledErrorMessage';
import { StyledButton } from '../../../commonStyles/StyledButton';

const FormRegistration: FC = () => {
  const dispatch = useAppDispatch();

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
      onSubmit={(
        values: IFormRegistrationValues,
        { setSubmitting }: FormikHelpers<any>,
      ) => {
        dispatch(setRegistration(values));

        setSubmitting(false);
      }}
    >
      <Form>
        <StyledLabel htmlFor="username">Имя пользователя</StyledLabel>
        <StyledField id="username" type="text" name="username" />
        <ErrorMessage name="username">
          {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>

        <StyledLabel htmlFor="phoneNumber">Номер телефона</StyledLabel>
        <StyledField id="phoneNumber" type="text" name="phoneNumber" />
        <ErrorMessage name="phoneNumber">
          {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>

        <StyledLabel htmlFor="password">Пароль</StyledLabel>
        <StyledField id="password" type="password" name="password" />
        <ErrorMessage name="password">
          {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>

        <StyledLabel htmlFor="passwordConfirm">Подтвердите пароль</StyledLabel>
        <StyledField
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
        />
        <ErrorMessage name="passwordConfirm">
          {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>

        <StyledLabel htmlFor="email">Email</StyledLabel>
        <StyledField id="email" type="text" name="email" />
        <ErrorMessage name="email">
          {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>

        <StyledButton type="submit">Зарегистрироваться</StyledButton>
      </Form>
    </Formik>
  );
};

export default FormRegistration;
