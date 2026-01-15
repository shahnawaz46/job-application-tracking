export const getNameInitial = (name: string) => {
  const splitted = name.split(" ");

  if (splitted.length > 1) {
    return splitted[0][0] + splitted[1][0];
  }

  return splitted[0][0] + splitted[0][1];
};
