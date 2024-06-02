import {
  DEFAULT_EARTH_TIMESTAP_TIME,
  EARTH_TIME,
  EARTH_TIME_IN_TIMESTAMP,
} from "../Constants/Earth";

export const totalEarthDaysPerYear = (monthArray: number[]) => {
  let totalDayPerYear = 0;

  for (let i = 0; i < monthArray.length; i++) {
    totalDayPerYear = totalDayPerYear + monthArray[i];
  }

  return totalDayPerYear;
};

export const checkLeapYear = (year: number) => {
  if (year % 4 > 0) return false;

  return true;
};

export const calculateYear = (totalDays: number, timestamp: number) => {
  let tempTotalDays = totalDays;
  let tempTimestamp = timestamp;
  let timestampCounter = 0;
  let lastTimestampCounter = 0;
  let tempYear = 0;
  let leapYearCounter = 0;
  let isLeapYear = false;

  while (timestampCounter < tempTimestamp) {
    if (checkLeapYear(DEFAULT_EARTH_TIMESTAP_TIME.year + tempYear)) {
      tempTotalDays = totalDays + 1;
      leapYearCounter += 1;
      isLeapYear = false;
    } else {
      tempTotalDays = totalDays;
      isLeapYear = true;
    }

    lastTimestampCounter = timestampCounter;
    timestampCounter =
      timestampCounter + tempTotalDays * EARTH_TIME_IN_TIMESTAMP.day;
    tempYear = tempYear + 1;
  }

  return {
    year: tempYear - 1,
    currentYearTimestamp:
      lastTimestampCounter - EARTH_TIME_IN_TIMESTAMP.hour * EARTH_TIME.utc,
    leapYearCounter: leapYearCounter,
  };
};

export const calculateMonth = (
  year: number,
  currentYearTimestamp: number,
  monthArray: number[],
  currentTimestamp: number
) => {
  let tempMonthArray = [...monthArray];
  let tempCurrentTimestamp = currentTimestamp;
  let tempMonth = 0;
  let tempTotalDays = 0;
  let lastMonthTimestampCounter = 0;
  let differenceTimestamp = tempCurrentTimestamp - currentYearTimestamp;

  if (checkLeapYear(year)) tempMonthArray.splice(1, 1, 29);

  while (differenceTimestamp > tempTotalDays) {
    tempMonth = tempMonth + 1;
    lastMonthTimestampCounter = tempTotalDays;
    tempTotalDays =
      tempTotalDays + tempMonthArray[tempMonth] * EARTH_TIME_IN_TIMESTAMP.day;
  }

  return {
    month: tempMonth,
    currentMonthTimestamp:
      lastMonthTimestampCounter +
      currentYearTimestamp +
      EARTH_TIME_IN_TIMESTAMP.day,
  };
};

export const calculateDay = (
  currentDayTimestamp: number,
  currentTimestamp: number
) => {
  let tempCurrentTimestamp = currentTimestamp;
  let tempCurrentDayTimestamp = currentDayTimestamp;
  let tempDay = 0;
  let dayTimestampCounter = 0;
  let lastDayTimestampCounter = 0;

  while (dayTimestampCounter + tempCurrentDayTimestamp < tempCurrentTimestamp) {
    tempDay = tempDay + 1;
    lastDayTimestampCounter = dayTimestampCounter;
    dayTimestampCounter = dayTimestampCounter + EARTH_TIME_IN_TIMESTAMP.day;
  }

  return {
    day: tempDay,
    currentDayTimestamp: lastDayTimestampCounter + tempCurrentDayTimestamp,
  };
};

export const calculateHour = (
  currentHourTimestamp: number,
  currentTimestamp: number
) => {
  const differenceTimestamp = currentTimestamp - currentHourTimestamp;
  const hour = Math.floor(differenceTimestamp / EARTH_TIME_IN_TIMESTAMP.hour);

  return {
    hour: hour,
    currentHourTimestamp:
      currentHourTimestamp + hour * EARTH_TIME_IN_TIMESTAMP.hour,
  };
};

export const calculateMinute = (
  currentMinuteTimestamp: number,
  currentTimestamp: number
) => {
  const differenceTimestamp = currentTimestamp - currentMinuteTimestamp;
  const minute = Math.floor(
    differenceTimestamp / EARTH_TIME_IN_TIMESTAMP.minute
  );

  return {
    minute: minute,
    second:
      currentTimestamp -
      (currentMinuteTimestamp + minute * EARTH_TIME_IN_TIMESTAMP.minute),
  };
};

export const calculateEarthTimeAll = (
  totalDays: number,
  monthArray: number[],
  timestamp: number
) => {
  const year = calculateYear(totalDays, timestamp);
  const month = calculateMonth(
    year.year,
    year.currentYearTimestamp,
    monthArray,
    timestamp
  );
  const day = calculateDay(month.currentMonthTimestamp, timestamp);
  const hour = calculateHour(day.currentDayTimestamp, timestamp);
  const minute = calculateMinute(hour.currentHourTimestamp, timestamp);

  return {
    year: year.year,
    month: month.month,
    day: day.day,
    hour: hour.hour,
    minute: minute.minute,
    second: minute.second,
  };
};
