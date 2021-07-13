/* eslint-disable import/prefer-default-export */
import { defaults, pick } from 'lodash';

export const prepareInitialValues = (initialValues, defaultValues) => {
  const merge = defaults(initialValues, defaultValues);
  return pick(merge, Object.keys(defaultValues));
};
