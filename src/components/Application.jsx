// Import styles, componenents, custom hook, and selector functions
import React from 'react';
import 'components/Application.scss';

import DayList from './DayList';
import Appointment from './Appointment';

import useApplicationData from './hooks/useApplicationData';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from '../helpers/selectors';

export default function Application() {

  // Bring in initial state data, API related fucntions from our custom hook
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  // Retrieve appointments and interviewers for the currently selected day
  const appointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // Create a list of open appointment times and booked interviews to display
  // using the Appointment component
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // Return HTML to be rendered using JSX. Selectable day list sidebar and the
  // generated Appointment Component in the main container
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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
