export const getJoinedDate = (createdAt: string) => {
  const date = new Date(createdAt);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
};

export const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return "";

  // en-GB -> english, Great Britain(UK)
  return Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
