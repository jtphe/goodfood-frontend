export const errorHandler = (error) => {
  switch (error) {
    case 'Bad ID':
      console.log(error);
      break;
    case 'Bad Password':
      console.log(error);
      break;
    default:
      console.log(error.default);
  }
};
