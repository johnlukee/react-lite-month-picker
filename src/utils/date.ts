export const getFirstDayOfMonth = (m?: { year: number; month: number }) =>
  m ? new Date(m.year, m.month - 1, 1) : undefined;

export const dateToMonthObject = (
  date?: Date
): { year: number; month: number } | undefined => {
  return date
    ? { year: date.getFullYear(), month: date.getMonth() + 1 }
    : undefined;
};
