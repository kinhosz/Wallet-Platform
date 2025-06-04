export function formatSlashDivision(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const str_month = month > 9 ? month.toString() : `0${month.toString()}`;
  const str_day = day > 9 ? day.toString() : `0${day.toString()}`;

  return `${str_day}/${str_month}/${year}`;
}
