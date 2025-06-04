export function formatLongMonth(date: Date) {
  const month = date.toLocaleString("en-US", { month: "long"});
  const day = date.getDate();
  const year = date.getFullYear();
  const now = new Date();

  if (year != now.getFullYear()) return `${month}, ${day}. ${year}`;
  else return `${month}, ${day}`;
}
