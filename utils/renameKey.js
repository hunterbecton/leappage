import { cloneObject } from 'utils';

export const renameKey = (object, key, newKey) => {
  const clonedObj = cloneObject(object);

  const targetKey = clonedObj[key];

  delete clonedObj[key];

  clonedObj[newKey] = targetKey;

  return clonedObj;
};
