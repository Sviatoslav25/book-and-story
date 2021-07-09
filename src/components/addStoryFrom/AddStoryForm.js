import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
import FormikFormGroup from '../formik/FormikFormGroup';
import FormikFormControl from '../formik/FormikFormControl';
import FormikTextAreaField from '../formik/FormikTextAreaField';
import ButtonWithSpinner from '../common/ButtonWithSpinner';

export default function AddStoryForm({ onSubmit }) {
  const NAME_MIN = 3;
  const NAME_MAX = 80;
  const GENRE_MIN = 3;
  const GENRE_MAX = 80;
  const SORT_DESCRIPTION_MIN = 5;
  const SORT_DESCRIPTION_MAX = 3000;
  const STORY_MIN = 10;

  const initialValues = {
    name: '',
    date: '',
    genre: '',
    shortDescription: '',
    story: '',
  };

  const schema = yup.object().shape({
    name: yup.string().label('Story name').required().min(NAME_MIN).max(NAME_MAX),
    date: yup.date().required(),
    genre: yup.string().required().min(GENRE_MIN).max(GENRE_MAX),
    shortDescription: yup.string().required().min(SORT_DESCRIPTION_MIN).max(SORT_DESCRIPTION_MAX),
    story: yup.string().required().min(STORY_MIN),
  });

  return (
    <Formik validationSchema={schema} initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <FormikForm>
          <FormikFormGroup label="Story name">
            <FormikFormControl name="name" placeholder="Enter story name" required />
          </FormikFormGroup>
          <FormikFormGroup label="Story release date">
            <FormikFormControl name="date" placeholder="Enter story release date" required type="date" />
          </FormikFormGroup>
          <FormikFormGroup label="Story genre">
            <FormikFormControl name="genre" placeholder="Enter the genre of the story" required />
          </FormikFormGroup>
          <FormikFormGroup label="Short description">
            <FormikTextAreaField name="shortDescription" required />
          </FormikFormGroup>
          <FormikFormGroup label="Story">
            <FormikTextAreaField name="story" required />
          </FormikFormGroup>
          <ButtonWithSpinner type="submit" block loading={isSubmitting}>
            Add Story
          </ButtonWithSpinner>
        </FormikForm>
      )}
    </Formik>
  );
}
