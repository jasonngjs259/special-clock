import { EARTH_TIME_IN_TIMESTAMP } from "../Constants/Earth";

export const getDateObject = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};

export const getUTCDateObject = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
  };
};

export const getTimezoneOffSetInMilliseconds = () => {
  const date = new Date();

  return date.getTimezoneOffset() * EARTH_TIME_IN_TIMESTAMP.minute;
};

export const getTimestamp = (dateTime: string) => {
  const date = new Date(dateTime);

  return date.getTime() / 1000;
};

export const getUTCTimestamp = (time: {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}) => {
  const result = Date.UTC(
    time.year,
    time.month - 1,
    time.day,
    time.hour,
    time.minute,
    time.second,
    0
  );

  return result;
};

export const checkLeapYear = (year: number) => {
  if (year % 4 > 0) return false;

  return true;
};
