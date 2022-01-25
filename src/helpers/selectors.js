export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  const filteredDay = state.days.find((currentDay) => currentDay.name === day);

  if (!filteredDay) {
    return [];
  }

  const appointmentsForDay = filteredDay.appointments.map(
    (id) => state.appointments[id]
  );

  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const theInterview = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };

  return theInterview;
}

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  const filteredDay = state.days.find((currentDay) => currentDay.name === day);

  if (!filteredDay) {
    return [];
  }

  const interviewersForDay = [];
  const appointmentIDs = [...filteredDay.appointments];

  for (const id of appointmentIDs) {
    const interview = getInterview(state, state.appointments[id].interview);
    if (interview) {
      interviewersForDay.push(interview.interviewer);
    }
  }

  return interviewersForDay;
}
