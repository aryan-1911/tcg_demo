import { format, isToday, isYesterday, parseISO } from 'date-fns';
import moment from 'moment-timezone';

const formatDate = format;

export const formatFn = (format: string) => {
  return (date: Date | number | string | null) => {
    if (!date) return null;
    const parsedDate = parseISO(date.toString());
    return formatDate(parsedDate, format);
  };
};

export const formatDateWithFormat = (date: any, format?: string) => {
  if (!date) {
    return '';
  }

  const utcDate = moment.utc(date);
  return moment(utcDate).clone().tz('America/Chicago').format(format || 'MM-DD-YYYY HH:mm:ss');
  // return moment(date).local().format(format || 'YYYY-MM-DD HH:mm:ss');
};


export const formatDatePicker = (format: string) => {
  return (date: Date | number | string | null) => {
    if (!date) return null;
    return formatDate(+new Date(date), format);
  };
};

export const birthDayDateFormat = (date: string): string => {
  const parsedDate = parseISO(date);
  if (date) {
    return formatDate(parsedDate, 'LL-dd-yyyy');
  }
  return date;
};

export const formatMessageDate = (date: string): string => {
  const parsedDate = parseISO(date);

  // today
  if (isToday(parsedDate)) {
    return formatDate(parsedDate, 'HH:mm');
  }
  // yesterday
  if (isYesterday(parsedDate)) {
    return 'yesterday';
  }

  return formatDate(parsedDate, 'dd MMM');
};
