export const formatDate = (date: string | undefined) => {
  if (!date) {
    return "";
  }

  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};