export function formatLongMonth(date: string) {
  const date_date = new Date(date);
  const month = date_date.toLocaleString("en-US", { month: "long"});
  const day = date_date.getDate();
  const year = date_date.getFullYear();
  const now = new Date();

  if (year != now.getFullYear()) return `${month}, ${day}. ${year}`;
  else return `${month}, ${day}`;
}
