import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";

import Button from "./Button";
import DayList from './DayList';
import DayListItem from "./DayListItem";
import InterviewerList from "./InterviewerList";
import InterviewerListItem from './InterviewerListItem';
import Appointment from './Appointment';

import { getAppointmentsForDay } from "../helpers/selectors";

export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = (day) => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments')
    ])
      .then(response => {
        const daysData = response[0].data;
        const appointmentsData = response[1].data;
        setState(prev => ({ ...prev, days: daysData, appointments: appointmentsData }))
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentList = dailyAppointments.map(appointment => (
    <Appointment
      key={appointment.id}
      {...appointment}
    />
  ));

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
