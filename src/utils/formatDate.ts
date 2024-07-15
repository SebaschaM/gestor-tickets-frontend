import { format, toDate } from 'date-fns-tz';

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const timeZone = 'America/Lima'; // UTC-5

  // Convert the date to the specified time zone
  const zonedDate = toDate(date, { timeZone });

  // Format the date to the desired format
  const formattedDate = format(zonedDate, 'dd/MM/yyyy HH:mm:ss', { timeZone });

  return formattedDate;
}
