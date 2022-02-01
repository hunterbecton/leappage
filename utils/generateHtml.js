export const deserializeNodes = (nodes) => {
  return Object.entries(nodes).map(([id, val]) => ({ id, ...val }));
};
