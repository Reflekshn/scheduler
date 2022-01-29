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
  // Function to calculate available appointment spots for a given day
  /////////////////////////////////////////////////////////////////////////////
  function updateSpots(day, appointments) {
    let counter = 0;
    day.appointments.forEach((id) => {
      if (appointments[id].interview === null) {
        counter++;
      }
    });
    return counter;
  }

  /////////////////////////////////////////////////////////////////////////////
  // Function to save new interview when created in the Form Component
  /////////////////////////////////////////////////////////////////////////////
  const bookInterview = (id, interview) => {
    // Create a new booked appointment object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // Copy the appointments list and add the updated one
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Copy the days list and update the available appointment spots
    // for the currently selected day
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return { ...day, spots: updateSpots(day, appointments) };
      } else {
        return { ...day };
      }
    });

    // Make an API put request to update the database
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      // Update the appointments and days lists in the state object
      setState({ ...state, appointments, days });
    });
  };

  /////////////////////////////////////////////////////////////////////////////
  // Function to delete a booked interview
  /////////////////////////////////////////////////////////////////////////////
  const cancelInterview = (id) => {
    // Create a new appointment object without a booked interview
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    // Copy the appointments list and add the updated one
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Copy the days list and update the available appointment spots
    // for the currently selected day
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return { ...day, spots: updateSpots(day, appointments) };
      } else {
        return { ...day };
      }
    });

    // Make an API delete request to update the database
    return axios.delete(`api/appointments/${id}`).then(() => {
      // Update the appointments and days lists in the state object
      setState({ ...state, appointments, days });
    });
  };

  // Return state and functions to be used in our Application Component
  return { state, setDay, bookInterview, cancelInterview };
}
