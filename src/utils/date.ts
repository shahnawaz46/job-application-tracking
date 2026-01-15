export const getJoinedDate = (createdAt: string) => {
  const date = new Date(createdAt);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
};
