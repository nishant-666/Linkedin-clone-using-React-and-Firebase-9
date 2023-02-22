import uuid from "react-uuid";

export const getUniqueID = () => {
  let id = uuid();

  return id;
};
