export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const checkPassword = (password, confirmationPassword) => {
  if (password !== confirmationPassword) {
    return false;
  } else {
    return true;
  }
};
