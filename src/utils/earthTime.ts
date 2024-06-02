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

export const calculateYear = (
  totalDays: number,
  timestamp: number,
  year: number,
  type: string
) => {
  let tempTotalDays = totalDays;
  let tempTimestamp = timestamp;
  let timestampCounter = 0;
  let lastTimestampCounter = 0;
  let tempYear = 0;
  let leapYearCounter = 0;

  if (type === "year") {
    while (tempYear < year - DEFAULT_EARTH_TIMESTAP_TIME.year) {
      if (checkLeapYear(DEFAULT_EARTH_TIMESTAP_TIME.year + tempYear)) {
        tempTotalDays = totalDays + 1;
        leapYearCounter += 1;
      } else {
        tempTotalDays = totalDays;
      }

      lastTimestampCounter = timestampCounter;
      timestampCounter =
        timestampCounter + tempTotalDays * EARTH_TIME_IN_TIMESTAMP.day;
      tempYear = tempYear + 1;
    }

    console.log(tempYear);

    return {
      year: tempYear,
      currentYearTimestamp: lastTimestampCounter,
      leapYearCounter: leapYearCounter,
    };
  }

  while (timestampCounter < tempTimestamp) {
    if (checkLeapYear(DEFAULT_EARTH_TIMESTAP_TIME.year + tempYear)) {
      tempTotalDays = totalDays + 1;
      leapYearCounter += 1;
    } else {
      tempTotalDays = totalDays;
    }

    lastTimestampCounter = timestampCounter;
    timestampCounter =
      timestampCounter + tempTotalDays * EARTH_TIME_IN_TIMESTAMP.day;
    tempYear = tempYear + 1;
  }

  return {
    year: tempYear,
    currentYearTimestamp: lastTimestampCounter,
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
    lastMonthTimestampCounter = tempTotalDays;
    tempTotalDays =
      tempTotalDays + tempMonthArray[tempMonth] * EARTH_TIME_IN_TIMESTAMP.day;
    tempMonth = tempMonth + 1;
  }

  return {
    month: tempMonth,
    currentMonthTimestamp: lastMonthTimestampCounter + currentYearTimestamp,
  };
};

export const calculateDay = (
  currentDayTimestamp: number,
  currentTimestamp: number
) => {
  let tempCurrentTimestamp = currentTimestamp;
  let tempCurrentDayTimestamp = currentDayTimestamp;
  let differenceTimestamp = tempCurrentTimestamp - tempCurrentDayTimestamp;
  let tempDay = 0;
  let dayTimestampCounter = 0;
  let lastDayTimestampCounter = 0;

  while (dayTimestampCounter < differenceTimestamp) {
    lastDayTimestampCounter = dayTimestampCounter;
    dayTimestampCounter = dayTimestampCounter + EARTH_TIME_IN_TIMESTAMP.day;
    tempDay = tempDay + 1;
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
  const tempYear = calculateYear(totalDays, timestamp, 0, "");
  const tempMonth = calculateMonth(
    tempYear.year,
    tempYear.currentYearTimestamp,
    monthArray,
    timestamp
  );
  const tempDay = calculateDay(tempMonth.currentMonthTimestamp, timestamp);
  const tempHour = calculateHour(tempDay.currentDayTimestamp, timestamp);
  const tempMinute = calculateMinute(tempHour.currentHourTimestamp, timestamp);

  let finalYear = tempYear.year;
  let finalMonth = tempMonth.month + DEFAULT_EARTH_TIMESTAP_TIME.month;
  let finalDay = tempDay.day + DEFAULT_EARTH_TIMESTAP_TIME.day;
  let finalHour = tempHour.hour + DEFAULT_EARTH_TIMESTAP_TIME.hour;
  let finalMinute = tempMinute.minute + DEFAULT_EARTH_TIMESTAP_TIME.minute;
  let finalSecond = tempMinute.second + DEFAULT_EARTH_TIMESTAP_TIME.second;

  if (finalSecond >= EARTH_TIME.minute) {
    finalSecond = finalSecond - EARTH_TIME.minute;
    finalMinute = finalMinute + 1;
  }

  if (finalMinute >= EARTH_TIME.hour) {
    finalMinute = finalMinute - EARTH_TIME.hour;
    finalHour = finalHour + 1;
  }

  if (finalHour >= EARTH_TIME.day) {
    finalHour = finalHour - EARTH_TIME.day;
    finalDay = finalDay + 1;
  }

  if (finalDay >= monthArray[finalMonth - 1]) {
    finalDay = finalDay - monthArray[finalMonth - 1];
    finalMonth = finalMonth + 1;
  }

  if (finalMonth > monthArray.length) {
    finalMonth = finalMonth - monthArray.length;
    finalYear = finalYear + 1;
  }

  return {
    year: finalYear,
    month: finalMonth,
    day: finalDay,
    hour: finalHour,
    minute: finalMinute,
    second: finalSecond,
  };
};

export const convertEarthTimeToTimestamp = (
  time: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  },
  totalDays: number,
  monthArray: number[]
) => {
  const second = time.second;
  const minute = time.minute * EARTH_TIME_IN_TIMESTAMP.minute;
  const hour = time.hour * EARTH_TIME_IN_TIMESTAMP.hour;
  const day = (time.day - 1) * EARTH_TIME_IN_TIMESTAMP.day;

  const tempMonthArray = [...monthArray];

  if (checkLeapYear(time.year + DEFAULT_EARTH_TIMESTAP_TIME.year))
    tempMonthArray.splice(1, 1, 29);

  let tempMonthTotalDays = 0;
  for (let i = 0; i < time.month - 1; i++) {
    tempMonthTotalDays =
      tempMonthTotalDays + monthArray[i] * EARTH_TIME_IN_TIMESTAMP.day;
  }

  const year = calculateYear(
    totalDays,
    0,
    time.year,
    "year"
  ).currentYearTimestamp;

  const result = year + tempMonthTotalDays + day + hour + minute + second;

  return result;
};
