import React, { FC, MouseEvent } from 'react';
import {
  Form,
  Formik,
  Field,
  ErrorMessage,
  FormikHelpers,
  FieldArray,
} from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../hooks';
import { addService } from '../../../redux/reducers/servicesReducer';
import { IService } from '../../../commonInterfaces/IService';

const FormService: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{
        name: '',
        measure: '',
        materials: [''],
        colors: [''],
        price: 0,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Введите название услуги'),
        measure: Yup.string().required(
          'Укажите меру за которую выставлена цена',
        ),
        materials: Yup.array().nullable(),
        colors: Yup.array().of(Yup.string()).nullable(),
        price: Yup.number().required('Укажите цену'),
      })}
      onSubmit={(values: IService, { setSubmitting }: FormikHelpers<any>) => {
        console.log(values);

        dispatch(addService(values));
        setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form>
          <label htmlFor="name">Название услуги</label>
          <Field id="name" type="text" name="name" />
          <ErrorMessage name="name" />

          <label htmlFor="measure">Мера</label>
          <Field id="measure" type="text" name="measure" />
          <ErrorMessage name="measure" />
          <FieldArray name="materials">
            {({ insert, remove, push }) => (
              <div>
                {values.materials?.map((material, index) => (
                  <div key={index}>
                    <label htmlFor={`materials.${index}`}>Материалы</label>
                    <Field
                      id={`materials.${index}`}
                      type="text"
                      name={`materials.${index}`}
                    />
                    <ErrorMessage name={`materials.${index}`} />
                    <button type="button" onClick={() => remove(index)}>
                      X
                    </button>
                    <button type="button" onClick={() => push('')}>
                      Добавить материал
                    </button>
                  </div>
                ))}
              </div>
            )}
          </FieldArray>

          <FieldArray name="colors">
            {({ insert, remove, push }) => (
              <div>
                {values.colors?.map((color, index) => (
                  <div key={index}>
                    <label htmlFor={`colors.${index}`}>Цвета</label>
                    <Field
                      id={`colors.${index}`}
                      type="text"
                      name={`colors.${index}`}
                    />
                    <ErrorMessage name={`colors.${index}`} />
                    <button type="button" onClick={() => remove(index)}>
                      X
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        push('');
                      }}
                    >
                      Добавить цвет
                    </button>
                  </div>
                ))}
              </div>
            )}
          </FieldArray>

          <label htmlFor="price">Цена</label>
          <Field id="price" type="text" name="price" />
          <ErrorMessage name="price" />
          <button type="submit">Добавить услугу</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormService;
