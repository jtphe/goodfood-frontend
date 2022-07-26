export const errorHandler = (error) => {
  switch (error) {
    case 'Bad ID':
      console.log(error);
      break;
    case 'Bad Password':
      return error;
    default:
      console.log(error.default);
  }
};
