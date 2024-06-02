import {
  ALIEN_TIME,
  ALIEN_TIME_IN_TIMESTAMP,
  DEFAULT_ALIEN_TIMESTAMP_TIME,
} from "../Constants/Alien";

export const totalAlienDaysPerYear = (monthArray: number[]) => {
  let totalDayPerYear = 0;

  for (let i = 0; i < monthArray.length; i++) {
    totalDayPerYear = totalDayPerYear + monthArray[i];
  }

  return totalDayPerYear;
};

export const addRemainingDays = () => {
  let day =
    ALIEN_TIME.month[DEFAULT_ALIEN_TIMESTAMP_TIME.month - 1] -
    DEFAULT_ALIEN_TIMESTAMP_TIME.day;
  let hour = ALIEN_TIME.day - DEFAULT_ALIEN_TIMESTAMP_TIME.hour;
  let minute = ALIEN_TIME.hour - DEFAULT_ALIEN_TIMESTAMP_TIME.minute;
  let second = ALIEN_TIME.minute - DEFAULT_ALIEN_TIMESTAMP_TIME.second;

  let result =
    day * ALIEN_TIME_IN_TIMESTAMP.day +
    hour * ALIEN_TIME_IN_TIMESTAMP.hour +
    minute * ALIEN_TIME_IN_TIMESTAMP.minute +
    second;

  return result;
};

export const alignTimestamp = (timestamp: number) => {
  return timestamp + addRemainingDays();
};

export const calculateYear = (
  totalDays: number,
  timestamp: number,
  year: number,
  type: string
) => {
  let finalYear = Math.floor(
    timestamp / totalDays / ALIEN_TIME_IN_TIMESTAMP.day
  );

  if (type === "year") {
    return {
      year: year,
      currentYearTimestamp:
        (year - (DEFAULT_ALIEN_TIMESTAMP_TIME.year + 1)) *
        totalDays *
        ALIEN_TIME_IN_TIMESTAMP.day,
    };
  }

  return {
    year: finalYear + 1,
    currentYearTimestamp: finalYear * totalDays * ALIEN_TIME_IN_TIMESTAMP.day,
  };
};

export const calculateMonth = (
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

  while (differenceTimestamp >= tempTotalDays) {
    lastMonthTimestampCounter = tempTotalDays;
    tempTotalDays =
      tempTotalDays + tempMonthArray[tempMonth] * ALIEN_TIME_IN_TIMESTAMP.day;
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

  while (dayTimestampCounter <= differenceTimestamp) {
    lastDayTimestampCounter = dayTimestampCounter;
    dayTimestampCounter = dayTimestampCounter + ALIEN_TIME_IN_TIMESTAMP.day;
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
  let differenceTimestamp = currentTimestamp - currentHourTimestamp;
  let hour = Math.floor(differenceTimestamp / ALIEN_TIME_IN_TIMESTAMP.hour);

  return {
    hour: hour,
    currentHourTimestamp:
      currentHourTimestamp + hour * ALIEN_TIME_IN_TIMESTAMP.hour,
  };
};

export const calculateMinute = (
  currentMinuteTimestamp: number,
  currentTimestamp: number
) => {
  let differenceTimestamp = currentTimestamp - currentMinuteTimestamp;
  let minute = Math.floor(differenceTimestamp / ALIEN_TIME_IN_TIMESTAMP.minute);

  return {
    minute: minute,
    second:
      currentTimestamp -
      (currentMinuteTimestamp + minute * ALIEN_TIME_IN_TIMESTAMP.minute),
  };
};

export const calculateAlienTimeAll = (
  totalDays: number,
  monthArray: number[],
  timestamp: number
) => {
  const tempYear = calculateYear(totalDays, timestamp, 0, "");
  const tempMonth = calculateMonth(
    tempYear.currentYearTimestamp,
    monthArray,
    timestamp
  );
  const tempDay = calculateDay(tempMonth.currentMonthTimestamp, timestamp);
  const tempHour = calculateHour(tempDay.currentDayTimestamp, timestamp);
  const tempMinute = calculateMinute(tempHour.currentHourTimestamp, timestamp);

  let finalYear = tempYear.year;
  let finalMonth = tempMonth.month + DEFAULT_ALIEN_TIMESTAMP_TIME.month;
  let finalDay = tempDay.day + DEFAULT_ALIEN_TIMESTAMP_TIME.day;
  let finalHour = tempHour.hour + DEFAULT_ALIEN_TIMESTAMP_TIME.hour;
  let finalMinute = tempMinute.minute + DEFAULT_ALIEN_TIMESTAMP_TIME.minute;
  let finalSecond = tempMinute.second + DEFAULT_ALIEN_TIMESTAMP_TIME.second;

  console.log(finalYear);
  console.log(finalSecond);

  if (finalSecond >= ALIEN_TIME.minute) {
    finalSecond = finalSecond - ALIEN_TIME_IN_TIMESTAMP.minute;
    finalMinute = finalMinute + 1;
  } else if (finalSecond < 0) {
    finalSecond = Math.abs(finalSecond);
  }

  if (finalMinute >= ALIEN_TIME.hour) {
    finalMinute = finalMinute - ALIEN_TIME_IN_TIMESTAMP.hour;
    finalHour = finalHour + 1;
  } else if (finalMinute < 0) {
    finalMinute = Math.abs(finalMinute);
  }

  if (finalHour >= ALIEN_TIME.day) {
    finalHour = finalHour - ALIEN_TIME_IN_TIMESTAMP.day;
    finalDay = finalDay + 1;
  } else if (finalHour < 0) {
    finalHour = Math.abs(finalHour);
    finalDay = finalDay - 1;
  }

  if (finalDay >= monthArray[finalMonth - 1]) {
    finalDay = finalDay - monthArray[finalMonth - 1];
    finalMonth = finalMonth + 1;
  } else if (finalDay < 1) {
    finalDay = Math.abs(finalDay);
    finalMonth = finalMonth - 1;
  }

  if (finalMonth > monthArray.length) {
    finalMonth = finalMonth - monthArray.length;
    finalYear = finalYear + 1;
  } else if (finalMonth < 1) {
    finalMonth = Math.abs(finalMonth);
    finalYear = finalYear - 1;
  }

  console.log(finalMonth);

  return {
    year: finalYear + DEFAULT_ALIEN_TIMESTAMP_TIME.year,
    month: finalMonth,
    day: finalDay,
    hour: finalHour,
    minute: finalMinute,
    second: finalSecond,
  };
};

export const convertAlienTimeToTimestamp = (
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
  const minute = time.minute * ALIEN_TIME_IN_TIMESTAMP.minute;
  const hour = time.hour * ALIEN_TIME_IN_TIMESTAMP.hour;
  const day = (time.day - 1) * ALIEN_TIME_IN_TIMESTAMP.day;

  let tempMonthTotalDays = 0;
  for (let i = 0; i < time.month - 1; i++) {
    tempMonthTotalDays =
      tempMonthTotalDays + monthArray[i] * ALIEN_TIME_IN_TIMESTAMP.day;
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
