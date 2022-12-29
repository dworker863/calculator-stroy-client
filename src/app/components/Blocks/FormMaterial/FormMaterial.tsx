import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import React, { FC } from 'react';
import { IMaterial } from '../../../commonInterfaces/IMaterial';
import { StyledErrorMessage } from '../../../commonStyles/StyledErrorMessage';
import { StyledField } from '../../../commonStyles/StyledField';
import { StyledLabel } from '../../../commonStyles/StyledLabel';
import { useAppDispatch } from '../../../hooks';
import {
  addMaterial,
  changeMaterial,
} from '../../../redux/reducers/materialsReducer';
import { IMaterialState } from './IFormMaterial';
import Button from '../../Elements/Button/Button';

const FormMaterial: FC<IMaterialState> = ({ material, hideFormHandler }) => {
  const dispatch = useAppDispatch();

  console.log(!!material);

  return (
    <div>
      <Formik
        initialValues={{
          name: material?.name || '',
          consumption: material?.consumption || 0,
          package: material?.package || 0,
          price: material?.price || 0,
          services: material?.services || [],
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Введите название материала'),
          consumption: Yup.number().required('Укажите расход квадратный метр'),
          package: Yup.number().required('Укажите размер упаковки'),
          price: Yup.number().required('Укажите цену'),
        })}
        onSubmit={(
          values: IMaterial,
          { setSubmitting }: FormikHelpers<any>,
        ) => {
          console.log(values);

          if (material) {
            dispatch(changeMaterial(material.id, values));
          } else {
            dispatch(addMaterial(values));
          }

          hideFormHandler();
          setSubmitting(false);
        }}
        enableReinitialize
      >
        <Form>
          <StyledLabel htmlFor="name">Название материала</StyledLabel>
          <StyledField id="name" type="text" name="name" />
          <ErrorMessage name="name">
            {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
          <StyledLabel htmlFor="consumption">
            Расход на м<sup>2</sup>
          </StyledLabel>
          <StyledField id="consumption" type="text" name="consumption" />
          <ErrorMessage name="consumption">
            {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
          <StyledLabel htmlFor="package">Вес одной упаковки</StyledLabel>
          <StyledField id="package" type="text" name="package" />
          <ErrorMessage name="package">
            {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
          <StyledLabel htmlFor="price">Цена упаковки</StyledLabel>
          <StyledField id="price" type="text" name="price" />
          <ErrorMessage name="price">
            {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
          <Button type="submit" text={material ? 'Изменить' : 'Сохранить'} />
        </Form>
      </Formik>
    </div>
  );
};

export default FormMaterial;
