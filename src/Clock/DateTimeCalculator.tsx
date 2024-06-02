import { useState } from "react";
import { ALIEN_TIME, DEFAULT_ALIEN_TIMESTAMP_TIME } from "../Constants/Alien";
import { DEFAULT_EARTH_TIMESTAP_TIME, EARTH_MONTH } from "../Constants/Earth";
import {
  calculateAlienTimeAll,
  totalAlienDaysPerYear,
} from "../utils/alienTime";
import {
  calculateEarthTimeAll,
  totalEarthDaysPerYear,
} from "../utils/earthTime";

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

  const [alienTime, setAlienTime] = useState(
    calculateAlienTimeAll(totalAlienDays, alienMonthArray, alienTimestamp)
  );
  const [earthTime, setEarthTime] = useState(
    calculateEarthTimeAll(totalEarthDays, earthMonthArray, earthTimestamp)
  );
  return (
    <div>
      <div>
        {earthTime.year + DEFAULT_EARTH_TIMESTAP_TIME.year}-{earthTime.month}-
        {earthTime.day} {earthTime.hour}:{earthTime.minute}:{earthTime.second}
      </div>
      <div>{earthTimestamp}</div>
      <div>{alienTimestamp}</div>
      <div>
        {alienTime.year + 1 + DEFAULT_ALIEN_TIMESTAMP_TIME.year}-
        {alienTime.month}-{alienTime.day} {alienTime.hour}:{alienTime.minute}:
        {alienTime.second}
      </div>
    </div>
  );
};

export default DateTimeCalculator;
