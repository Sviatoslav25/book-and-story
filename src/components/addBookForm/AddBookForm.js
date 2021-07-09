import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
import { Form } from 'react-bootstrap';
import ButtonWithSpinner from '../common/ButtonWithSpinner';
import useAPIMethod from '../../hooks/useAPIMethod';
import APIService from '../../services/APIService';
import paths from '../../router/paths';
import FormikFormControl from '../formik/FormikFormControl';
import FormikFormGroup from '../formik/FormikFormGroup';
import FormikTextAreaField from '../formik/FormikTextAreaField';
import FormikInputArray from '../formik/FormikInputArray';
import FormikFormCheck from '../formik/FormikFormCheck';

export default function AddBookForm() {
  const history = useHistory();

  const [addBook] = useAPIMethod({
    call: APIService.addBook,
    onError: (e) => toast.error(e.message),
    onComplete: () => {
      toast.success('Book created successfully');
      history.push(paths.home);
    },
  });

  const onSubmit = async (value) => {
    if (value.isPaid) {
      await addBook(value);
    } else {
      await addBook({ ...value, price: '' });
    }
  };

  const schema = yup.object().shape({
    name: yup.string().label('name').required().min(2).max(80),
    img: yup.string().label('Image URL').url().required(),
    date: yup.date().label('Book release date').required(),
    genre: yup.string().label('Book genre').min(3).max(60).required(),
    // price: yup.number().label('Book price'),
    pagesQuantity: yup.number().label('Pages quantity').required().min(4).max(3000),
    bookURL: yup.string().label('Link to book').url().required(),
    otherAuthors: yup.array().of(yup.string().label('Other authors').min(3).max(50)),
    description: yup.string().label('Description of the book').min(5).required(),
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
      {({ isSubmitting, values, errors }) => (
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
