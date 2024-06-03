import { useEffect, useState } from "react";
import {
  DEFAULT_EARTH_TIMESTAP_TIME,
  EARTH_MONTH,
  EARTH_TIME,
} from "../Constants/Earth";
import {
  calculateEarthTimeAll,
  checkLeapYear,
  totalEarthDaysPerYear,
} from "../utils/earthTime";
import styles from "./Clock.module.scss";

interface EarthClockProps {
  earthTimestamp: number;
}

const EarthClock = (props: EarthClockProps) => {
  const { earthTimestamp } = props;

  const monthArray = Object.values(EARTH_MONTH);
  const totalDays = totalEarthDaysPerYear(monthArray);
  const earthTime = calculateEarthTimeAll(
    totalDays,
    monthArray,
    earthTimestamp
  );

  const [year, setYear] = useState(earthTime.year);
  const [month, setMonth] = useState(earthTime.month);
  const [day, setDay] = useState(earthTime.day);
  const [hour, setHour] = useState(earthTime.hour);
  const [minute, setMinute] = useState(earthTime.minute);
  const [second, setSecond] = useState(earthTime.second);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSecond((prev) => prev + 1);
    }, 1000);

    if (second >= EARTH_TIME.minute) {
      setSecond(0);
      setMinute((prev) => prev + 1);
    }

    return () => clearTimeout(timeout);
  }, [second]);

  useEffect(() => {
    if (minute >= EARTH_TIME.hour) {
      setMinute(0);
      setHour((prev) => prev + 1);
    }
  }, [minute]);

  useEffect(() => {
    if (hour >= EARTH_TIME.day) {
      setHour(0);
      setDay((prev) => prev + 1);
    }
  }, [hour]);

  useEffect(() => {
    const isLeapYear = checkLeapYear(year + DEFAULT_EARTH_TIMESTAP_TIME.year);
    const tempMonthArray = [...monthArray];

    if (isLeapYear) tempMonthArray.splice(1, 1, 29);

    if (day > tempMonthArray[month - 1]) {
      setDay(1);
      setMonth((prev) => prev + 1);
    }
  }, [day, year, month, monthArray]);

  useEffect(() => {
    if (month > monthArray.length) {
      setMonth(1);
      setYear((prev) => prev + 1);
    }
  }, [month, monthArray]);

  return (
    <div className={styles.clockMainContainer}>
      <div className={styles.clockTitle}>Earth Time</div>
      {/* <div>Timestamp {earthTimestamp}</div> */}
      <div className={styles.dateContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.text}>{year}</div>
          <span>Year</span>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.text}>{month}</div>
          <span>Month</span>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.text}>{day}</div>
          <span>Day</span>
        </div>
      </div>

      <div className={styles.timeContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.text}>{hour}</div>
          <span>Hour</span>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.text}>{minute}</div>
          <span>Minute</span>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.text}>{second}</div>
          <span>Second</span>
        </div>
      </div>
    </div>
  );
};

export default EarthClock;
