import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import { IFormAuthValues } from './IFormAuth';
import React, { FC } from 'react';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../hooks';
import { setLogin } from '../../../redux/reducers/authReducer';
import { StyledField } from '../../../commonStyles/StyledField';
import { StyledLabel } from '../../../commonStyles/StyledLabel';
import { StyledErrorMessage } from '../../../commonStyles/StyledErrorMessage';
import Button from '../../Elements/Button/Button';

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
      onSubmit={(
        values: IFormAuthValues,
        { setSubmitting }: FormikHelpers<IFormAuthValues>,
      ) => {
        console.log(11111);

        dispatch(setLogin(values));
        setSubmitting(false);
      }}
    >
      <Form>
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

        <Button type="submit" text="Войти" />
      </Form>
    </Formik>
  );
};

export default FormAuth;
