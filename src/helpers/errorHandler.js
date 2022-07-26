export const errorHandler = (error) => {
  switch (error) {
    case 'Bad ID':
      break;
    case 'Bad Password':
      return error;
    default:
      console.log(error.default);
  }
};
