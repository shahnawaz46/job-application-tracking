export const getNameInitial = (name: string) => {
  if (!name) return "";

  const words = name.trim().split(/\s+/); // handles multiple spaces

  return words.map((word) => word.charAt(0).toUpperCase()).join("");
};

export const textTransform = (text: string) => {
  if (!text) return "";

  const words = text.trim().split(/\s+/); // handles multiple spaces

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
