export const PASSWORD_MIN_LENGTH = 10;
/*
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*?[#?!@$%^&*-]).+$/
);
*/
export const USERNAME_MIN_LENGTH = 5;

export const PASSWORD_REGEX = new RegExp(/(?=.*\d)/);

export const PASSWORD_REGEX_ERROR =
  "Password should contain at least one number (0123456789).";
