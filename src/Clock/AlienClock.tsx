import { useState, useEffect } from "react";
import { ALIEN_MONTH, ALIEN_TIME } from "../Constants/Alien";
import {
  totalAlienDaysPerYear,
  addAlienDefaultTime,
  convertAlienTimestampToTime,
} from "../utils/alienTime";
import styles from "./Clock.module.scss";

interface AlienClockProps {
  alienTimestamp: number;
}

const AlienClock = ({ alienTimestamp }: AlienClockProps) => {
  const totalDays = totalAlienDaysPerYear(Object.values(ALIEN_MONTH));
  const monthArray = ALIEN_TIME.month;
  const alienTime = addAlienDefaultTime(
    convertAlienTimestampToTime(totalDays, monthArray, alienTimestamp)
  );

  const [year, setYear] = useState(alienTime.year);
  const [month, setMonth] = useState(alienTime.month);
  const [day, setDay] = useState(alienTime.day);
  const [hour, setHour] = useState(alienTime.hour);
  const [minute, setMinute] = useState(alienTime.minute);
  const [second, setSecond] = useState(alienTime.second);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setSecond((prev) => prev + 1);
  //   }, 500);

  //   if (second >= ALIEN_TIME.minute) {
  //     setSecond(0);
  //     setMinute((prev) => prev + 1);
  //   }

  //   return () => clearTimeout(timeout);
  // }, [second]);

  useEffect(() => {
    if (minute >= ALIEN_TIME.hour) {
      setMinute(0);
      setHour((prev) => prev + 1);
    }
  }, [minute]);

  useEffect(() => {
    if (hour >= ALIEN_TIME.day) {
      setHour(0);
      setDay((prev) => prev + 1);
    }
  }, [hour]);

  useEffect(() => {
    const tempMonthArray = [...monthArray];

    if (day > tempMonthArray[month - 1]) {
      setDay(1);
      setMonth((prev) => prev + 1);
    }
  }, [day, month, monthArray]);

  useEffect(() => {
    if (month > monthArray.length) {
      setMonth(1);
      setYear((prev) => prev + 1);
    }
  }, [month, monthArray]);

  return (
    <div className={styles.clockMainContainer}>
      <div className={styles.clockTitle}>Alien Time</div>
      {/* <div>Timestamp {alienTimestamp}</div> */}
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

export default AlienClock;
