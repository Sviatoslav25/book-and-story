import React, { useRef } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
import FormikFormGroup from '../formik/FormikFormGroup';
import FormikFormControl from '../formik/FormikFormControl';
import FormikTextAreaField from '../formik/FormikTextAreaField';
import ButtonWithSpinner from '../common/ButtonWithSpinner';
import { prepareInitialValues } from '../../utils/form';
import FormikFormCheck from '../formik/FormikFormCheck';

const NAME_MIN = 3;
const NAME_MAX = 80;
const GENRE_MIN = 3;
const GENRE_MAX = 80;
const SORT_DESCRIPTION_MIN = 5;
const SORT_DESCRIPTION_MAX = 3000;
const STORY_MIN = 10;

const defaultValues = {
  name: '',
  genre: '',
  shortDescription: '',
  story: '',
  isPrivate: false,
};

const schema = yup.object().shape({
  name: yup.string().label('Story name').required().min(NAME_MIN).max(NAME_MAX),
  genre: yup.string().required().min(GENRE_MIN).max(GENRE_MAX),
  shortDescription: yup.string().required().min(SORT_DESCRIPTION_MIN).max(SORT_DESCRIPTION_MAX),
  story: yup.string().required().min(STORY_MIN),
});

export default function StoryForm({ onSubmit, textSubmitButton = 'Add story', initialValues = {} }) {
  const initialValuesRef = useRef();
  if (!initialValuesRef.current) {
    initialValuesRef.current = prepareInitialValues(initialValues, defaultValues);
  }

  return (
    <Formik validationSchema={schema} initialValues={initialValuesRef.current} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <FormikForm>
          <FormikFormGroup label="Story name">
            <FormikFormControl name="name" placeholder="Enter story name" required />
          </FormikFormGroup>
          <FormikFormGroup label="Story genre">
            <FormikFormControl name="genre" placeholder="Enter the genre of the story" required />
          </FormikFormGroup>
          <FormikFormCheck name="isPrivate" label="The story is private" />
          <FormikFormGroup label="Short description">
            <FormikTextAreaField name="shortDescription" required />
          </FormikFormGroup>
          <FormikFormGroup label="Story">
            <FormikTextAreaField name="story" required />
          </FormikFormGroup>
          <ButtonWithSpinner type="submit" block loading={isSubmitting}>
            {textSubmitButton}
          </ButtonWithSpinner>
        </FormikForm>
      )}
    </Formik>
  );
}
