// Containing all utilities functions
// for reducers

// not sure about the object type
export const updateObject = (oldObject: object, updatedProperties: object) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
