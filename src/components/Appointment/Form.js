import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
  // Set initial values for student and interviewer state variables
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // Resets the state variables back to empty values
  const reset = () => {
    setStudent('');
    setInterviewer(null);
  };

  // Reset the state variables and call back() to transition the mode to the previous state
  const cancel = () => {
    reset();
    props.onCancel();
  };

  // Render the Form Component to book a new interview
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter student name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={() => props.onSave(student, interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}
