import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const { days, day, setDay } = props;

  const parsedDays = days.map((currDay) => (
      <DayListItem
        key={currDay.id}
        name={currDay.name}
        spots={currDay.spots}
        selected={currDay.name === day}
        setDay={() => setDay(currDay.name)}
      />
    ))
  return (
    <ul>{parsedDays}</ul>
  );
}