export const EmailValidator = (value) => {
  const reg = /^[^@]+@[^@.]+\.[^@]+$/;
  return reg.test(value);
};

export const PasswordValidator = (value) => {
  const reg1 = /[!-~]{6,100}/;
  const reg2 = /[^!-~]/;
  if (reg1.test(value) && !reg2.test(value)) {
    return true;
    // return undefined;
  }
  return false;
  //   return 'the expression must contain only the letters of the Latin alphabet, numbers and special characters';
};
