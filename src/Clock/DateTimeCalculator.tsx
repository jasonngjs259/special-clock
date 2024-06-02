import { useState } from "react";
import { ALIEN_TIME, DEFAULT_ALIEN_TIMESTAMP_TIME } from "../Constants/Alien";
import { DEFAULT_EARTH_TIMESTAP_TIME, EARTH_MONTH } from "../Constants/Earth";
import {
  addRemainingDays,
  alignTimestamp,
  calculateAlienTimeAll,
  convertAlienTimeToTimestamp,
  totalAlienDaysPerYear,
} from "../utils/alienTime";
import {
  calculateEarthTimeAll,
  convertEarthTimeToTimestamp,
  totalEarthDaysPerYear,
} from "../utils/earthTime";
import styles from "./Clock.module.scss";

interface EarthClockProps {
  earthTimestamp: number;
  alienTimestamp: number;
}

const DateTimeCalculator = ({
  earthTimestamp,
  alienTimestamp,
}: EarthClockProps) => {
  const earthMonthArray = Object.values(EARTH_MONTH);
  const alienMonthArray = ALIEN_TIME.month;
  const totalAlienDays = totalAlienDaysPerYear(alienMonthArray);
  const totalEarthDays = totalEarthDaysPerYear(earthMonthArray);

  const [newEarthTimestamp, setNewEarthTimestamp] = useState(0);
  const [newAlienTimestamp, setNewAlienTimestamp] = useState(0);
  const [alienTime, setAlienTime] = useState(
    calculateAlienTimeAll(totalAlienDays, alienMonthArray, newAlienTimestamp)
  );
  const [earthTime, setEarthTime] = useState(
    calculateEarthTimeAll(totalEarthDays, earthMonthArray, newEarthTimestamp)
  );
  const [inputs, setInputs] = useState<{
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  }>({ year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 0 });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleEarthSubmit = (event: any) => {
    event.preventDefault();

    setEarthTime({
      year: inputs.year,
      month: inputs.month,
      day: inputs.day,
      hour: inputs.hour,
      minute: inputs.minute,
      second: inputs.second,
    });
    setNewEarthTimestamp(
      convertEarthTimeToTimestamp(
        {
          year: inputs.year,
          month: inputs.month,
          day: inputs.day,
          hour: inputs.hour,
          minute: inputs.minute,
          second: inputs.second,
        },
        totalEarthDays,
        earthMonthArray
      )
    );
    setNewAlienTimestamp(
      convertEarthTimeToTimestamp(
        {
          year: inputs.year,
          month: inputs.month,
          day: inputs.day,
          hour: inputs.hour,
          minute: inputs.minute,
          second: inputs.second,
        },
        totalEarthDays,
        earthMonthArray
      ) * 2
    );
    setAlienTime(
      calculateAlienTimeAll(
        totalAlienDays,
        alienMonthArray,
        convertEarthTimeToTimestamp(
          {
            year: inputs.year,
            month: inputs.month,
            day: inputs.day,
            hour: inputs.hour,
            minute: inputs.minute,
            second: inputs.second,
          },
          totalEarthDays,
          earthMonthArray
        ) * 2
      )
    );
  };

  const handleAlienSubmit = (event: any) => {
    event.preventDefault();

    setAlienTime({
      year: inputs.year,
      month: inputs.month,
      day: inputs.day,
      hour: inputs.hour,
      minute: inputs.minute,
      second: inputs.second,
    });
    setNewAlienTimestamp(
      convertAlienTimeToTimestamp(
        {
          year: inputs.year,
          month: inputs.month,
          day: inputs.day,
          hour: inputs.hour,
          minute: inputs.minute,
          second: inputs.second,
        },
        totalAlienDays,
        alienMonthArray
      )
    );
    setNewEarthTimestamp(
      convertAlienTimeToTimestamp(
        {
          year: inputs.year,
          month: inputs.month,
          day: inputs.day,
          hour: inputs.hour,
          minute: inputs.minute,
          second: inputs.second,
        },
        totalAlienDays,
        alienMonthArray
      ) / 2
    );
    setEarthTime(
      calculateEarthTimeAll(
        totalEarthDays,
        earthMonthArray,
        convertAlienTimeToTimestamp(
          {
            year: inputs.year,
            month: inputs.month,
            day: inputs.day,
            hour: inputs.hour,
            minute: inputs.minute,
            second: inputs.second,
          },
          totalAlienDays,
          alienMonthArray
        ) / 2
      )
    );
  };

  return (
    <div className={styles.clockMainContainer}>
      <div className={styles.clockTitle}>Earth Time</div>
      <form onSubmit={handleEarthSubmit}>
        <div className={styles.dateContainer}>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="year"
              value={inputs.year}
              onChange={handleChange}
            />
            <span>Year</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="month"
              value={inputs.month}
              onChange={handleChange}
            />
            <span>Month</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="day"
              value={inputs.day}
              onChange={handleChange}
            />
            <span>Day</span>
          </div>
        </div>

        <div className={styles.timeContainer}>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="hour"
              value={inputs.hour}
              onChange={handleChange}
            />
            <span>Hour</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="minute"
              value={inputs.minute}
              onChange={handleChange}
            />
            <span>Minute</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="second"
              value={inputs.second}
              onChange={handleChange}
            />
            <span>Second</span>
          </div>
        </div>
        <button type="submit">Convert</button>
      </form>

      <div>
        {earthTime.year}-{earthTime.month}-{earthTime.day} {earthTime.hour}:
        {earthTime.minute}:{earthTime.second}
      </div>
      <div>{newEarthTimestamp}</div>
      <div>{newAlienTimestamp}</div>
      <div>
        {alienTime.year}-{alienTime.month}-{alienTime.day} {alienTime.hour}:
        {alienTime.minute}:{alienTime.second}
      </div>

      <div className={styles.clockTitle}>Alien Time</div>
      <form onSubmit={handleAlienSubmit}>
        <div className={styles.dateContainer}>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="year"
              value={inputs.year}
              onChange={handleChange}
            />
            <span>Year</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="month"
              value={inputs.month}
              onChange={handleChange}
            />
            <span>Month</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="day"
              value={inputs.day}
              onChange={handleChange}
            />
            <span>Day</span>
          </div>
        </div>

        <div className={styles.timeContainer}>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="hour"
              value={inputs.hour}
              onChange={handleChange}
            />
            <span>Hour</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="minute"
              value={inputs.minute}
              onChange={handleChange}
            />
            <span>Minute</span>
          </div>
          <div className={styles.contentContainer}>
            <input
              type="number"
              name="second"
              value={inputs.second}
              onChange={handleChange}
            />
            <span>Second</span>
          </div>
        </div>

        <button type="submit">Convert</button>
      </form>
    </div>
  );
};

export default DateTimeCalculator;
