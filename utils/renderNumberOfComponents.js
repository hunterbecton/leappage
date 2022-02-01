export const renderNumberOfComponents = (number, component) => {
  let i = 0;
  let components = [];
  while (i < number) {
    i++;
    components.push(component);
  }
  return components;
};
