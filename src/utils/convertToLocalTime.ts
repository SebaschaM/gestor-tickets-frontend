import { format, parseISO, addHours } from 'date-fns';

export const convertToLocalTime = (dateString: string): string => {
  const date = parseISO(dateString);
  const updatedDate = addHours(date, 5);
  return format(updatedDate, 'dd-MM-yy HH:mm:ss');
};
