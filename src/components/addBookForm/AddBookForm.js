import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
import ButtonWithSpinner from '../common/ButtonWithSpinner';
import FormikFormControl from '../formik/FormikFormControl';
import FormikFormGroup from '../formik/FormikFormGroup';
import FormikTextAreaField from '../formik/FormikTextAreaField';
import FormikInputArray from '../formik/FormikInputArray';
import FormikFormCheck from '../formik/FormikFormCheck';

export default function AddBookForm({ onSubmit }) {
  const NAME_MIN = 3;
  const NAME_MAX = 80;
  const GENRE_MIN = 3;
  const GENRE_MAX = 80;
  const PAGE_QUANTITY_MIN = 4;
  const PAGE_QUANTITY_MAX = 3000;
  const OTHER_AUTHOR_FULL_NAME_MIN = 3;
  const OTHER_AUTHOR_FULL_NAME_MAX = 60;

  const schema = yup.object().shape({
    name: yup.string().label('name').required().min(NAME_MIN).max(NAME_MAX),
    img: yup.string().label('Image URL').url().required(),
    date: yup.date().label('Book release date').required(),
    genre: yup.string().label('Book genre').required().min(GENRE_MIN).max(GENRE_MAX),
    price: yup.number().label('Book price'),
    pagesQuantity: yup.number().label('Pages quantity').required().min(PAGE_QUANTITY_MIN).max(PAGE_QUANTITY_MAX),
    bookURL: yup.string().label('Link to book').url().required(),
    otherAuthors: yup
      .array()
      .of(yup.string().label('Other authors').min(OTHER_AUTHOR_FULL_NAME_MIN).max(OTHER_AUTHOR_FULL_NAME_MAX)),
    description: yup.string().label('Description of the book').required().min(5),
  });

  const initialValues = {
    name: '',
    img: '',
    date: '',
    genre: '',
    otherAuthors: [],
    pagesQuantity: '',
    isPaid: false,
    price: '',
    description: '',
    bookURL: '',
  };

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      {({ isSubmitting, values }) => (
        <FormikForm>
          <FormikFormGroup label="Book name">
            <FormikFormControl name="name" placeholder="Enter name" required />
          </FormikFormGroup>
          <FormikFormGroup label="Image URL">
            <FormikFormControl name="img" placeholder="Enter url" required type="url" />
          </FormikFormGroup>
          <FormikFormGroup label="Book release date">
            <FormikFormControl name="date" placeholder="Enter book release date" required type="date" />
          </FormikFormGroup>
          <FormikFormGroup label="Book genre">
            <FormikFormControl name="genre" placeholder="Enter the genre of the book" required />
          </FormikFormGroup>

          <FormikFormGroup label="Pages quantity">
            <FormikFormControl
              name="pagesQuantity"
              placeholder="Enter the number of pages in the book"
              required
              type="number"
            />
          </FormikFormGroup>
          <FormikFormGroup label="Link to book">
            <FormikFormControl name="bookURL" placeholder="Insert a link to the book" required type="url" />
          </FormikFormGroup>
          <FormikFormCheck name="isPaid" label="The book is paid" />
          {values.isPaid && (
            <FormikFormGroup label="Book price">
              <FormikFormControl name="price" placeholder="Enter the price of the book" required type="number" />
            </FormikFormGroup>
          )}
          <FormikInputArray
            formControlProps={{ placeholder: 'Enter author' }}
            label="Other authors"
            name="otherAuthors"
            addItemButtonLabel="+ Add author"
          />
          <FormikFormGroup label="Description of the book">
            <FormikTextAreaField name="description" required />
          </FormikFormGroup>
          <ButtonWithSpinner type="submit" block loading={isSubmitting}>
            Add Book
          </ButtonWithSpinner>
        </FormikForm>
      )}
    </Formik>
  );
}
