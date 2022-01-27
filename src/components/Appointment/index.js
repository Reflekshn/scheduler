import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'components/hooks/useVisualMode';

import 'components/Appointment/styles.scss';

export default function Appointment(props) {
  // Constants for the various mode states of the Appointment component
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const EDIT = 'EDIT';
  const CONFIRM = 'CONFIRM';

  // Set initial mode state depening on whether an interview is booked or not
  let { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Function called when Save Button is clicked on the new interview Form
  // component
  const save = (name, interviewer) => {
    // Save the info in an info object to pass to the bookInterview() function
    const interview = {
      student: name,
      interviewer,
    };
    // Transition to the intermediate "Saving..." mode state
    transition(SAVING);
    // Save the interview in the database API and transition to the SHOW mode once
    // completed
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => console.log(error));
  };

  // Function to delete a currently booked interview when the delete button is clicked
  const deleteInterview = (id) => {
    // Transition to the intermediate "Deleting..." mode state
    transition(DELETING, true);

    // Remove the interview from the database API and transition to the EMPTY mode once
    // completed
    props.cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => console.log(error))
  };

  // Display the Appointment Component conditionally dependent on the mode state
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === 'EMPTY' && <Empty onAdd={() => transition(CREATE)} />}
      {mode === 'SHOW' &&
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      }
      {mode === 'CREATE' && 
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      }
      {mode === 'EDIT' &&
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={() => back()}
        />
      }
      {mode === 'SAVING' && <Status message={'Saving'} />}
      {mode === 'DELETING' && <Status message={'Deleting'} />}
      {mode === 'CONFIRM' &&
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => back()}
          onConfirm={() => deleteInterview(props.id)}
        />}
    </article>
  );
}
