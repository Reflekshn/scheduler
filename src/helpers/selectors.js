///////////////////////////////////////////////////////////////////////////////
// Retrieve appointments for a specific day
///////////////////////////////////////////////////////////////////////////////
export function getAppointmentsForDay(state, day) {
  // Return an empty array if when the days data is empty
  if (state.days.length === 0) {
    return [];
  }

  // Find the specific day requested
  const filteredDay = state.days.find((currentDay) => currentDay.name === day);

  // Return an empty array if the day is not found
  if (!filteredDay) {
    return [];
  }

  // Create an array of all the appointments for the requested day
  const appointmentsForDay = filteredDay.appointments.map(
    (id) => state.appointments[id]
  );

  return appointmentsForDay;
}

///////////////////////////////////////////////////////////////////////////////
// Retrieve a specific interview if one exists
///////////////////////////////////////////////////////////////////////////////
export function getInterview(state, interview) {
  // Return null if there is no interview booked
  if (!interview) {
    return null;
  }

  // Create an interview object with the student and interviewr information
  const interviewerID = interview.interviewer;
  const interviewerInfo = state.interviewers[interviewerID];
  const resultingInterview = {
    student: interview.student,
    interviewer: interviewerInfo,
  };

  return resultingInterview;
}

///////////////////////////////////////////////////////////////////////////////
// Retrieve available interviewers for a specific day
///////////////////////////////////////////////////////////////////////////////
export function getInterviewersForDay(state, day) {
  // Return an empty array if when the days data is empty
  if (state.days.length === 0) {
    return [];
  }

  // Find the specific day requested
  const filteredDay = state.days.find((currentDay) => currentDay.name === day);

  // Return an empty array if the day is not found
  if (!filteredDay) {
    return [];
  }

  // Create an array of all the interviewers available on the requested day
  const interviewersForDay = filteredDay.interviewers.map((id) => state.interviewers[id] )

  return interviewersForDay;
}
