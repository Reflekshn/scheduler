import React from "react";
import Header from "./Header";
import Show from './Show';
import Empty from './Empty';

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const formatText = () => {
    if (props.time) {
      return `Appointment at ${props.time}`;
    } else {
      return `No Appointments`;
    }
  }
  return (
    <article className='appointment'>
      <Header time={props.time} />
      {props.interview ?
        <Show student={props.interview.student}
          interviewer={props.interview.interviewer.name} /> :
        <Empty />}
    </article>
  )
}