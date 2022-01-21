import React from "react";

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
    <article className="appointment">{formatText()}</article>
  )
}