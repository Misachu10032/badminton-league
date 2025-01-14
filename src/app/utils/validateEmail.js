// utils/validateEmail.js
import validator from 'validator';

export function isValidEmail(email) {
  return validator.isEmail(email);
}
