export const formatDate = (time) => {
  return new Date(time).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
