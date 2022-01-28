import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  // Set initial state object to be used throughout the application
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  // API requests to the database for days, appointments, and interviewers when the page loads
  useEffect(
    () => {
      Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers'),
      ])
        .then((response) => {
          const daysData = response[0].data;
          const appointmentsData = response[1].data;
          const interviewerData = response[2].data;

          // Set the states using the retrieved data
          setState((prev) => ({
            ...prev,
            days: daysData,
            appointments: appointmentsData,
            interviewers: interviewerData,
          }));
        })
        // Log error to console if data retrieval fails
        .catch((err) => {
          console.log(err);
        });
    },
    // Call this API hook only once
    []
  );

  // Alias state setter function to modify Day state in child components
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  /////////////////////////////////////////////////////////////////////////////
  // Function to save new interview when created in the Form Component
  /////////////////////////////////////////////////////////////////////////////
  const bookInterview = (id, interview) => {
    // Create the new individual appointment object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // Combine the new appointment with the existing ones
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Make an API put request to update the database with the new appointment
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      // Update the appointments list in the state object
      setState({ ...state, appointments });
    });
  };

  /////////////////////////////////////////////////////////////////////////////
  // Function to delete a booked interview
  /////////////////////////////////////////////////////////////////////////////
  const cancelInterview = (id) => {
    return axios.delete(`api/appointments/${id}`).then(() => {
      // Create an appointment object using the selected id and set the interview to null
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };

      // Combine the deleted appointment with the existing ones
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      // Update the appointments list in the state object
      setState({ ...state, appointments });
    });
  };

  // Return state and functions to be used in our Application Component
  return { state, setDay, bookInterview, cancelInterview };
}
