export const checkValidMongoId = (id) => {
  let checkForValidMongoDbID = new RegExp('^[0-9a-fA-F]{24}$');

  return checkForValidMongoDbID.test(id);
};
