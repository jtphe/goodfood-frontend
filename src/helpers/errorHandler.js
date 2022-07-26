export const errorHandler = (error) => {
  switch (error) {
    case 'Bad ID':
      return error;
    case 'Bad Password':
      return error;
    default:
      return 'Undefined Error';
  }
};
