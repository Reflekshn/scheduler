import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Status from './Status';
import useVisualMode from 'components/hooks/useVisualMode';

import 'components/Appointment/styles.scss';
import Form from './Form';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';

  let { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => console.log(error));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === 'EMPTY' && <Empty onAdd={() => transition(CREATE)} />}
      {mode === 'SHOW' && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === 'CREATE' && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          student={props.interview ? props.interview.student : null}
          interviewer={props.interview ? props.interviewer.id : null}
        />
      )}
      {mode === 'SAVING' && <Status message={'Saving'} />}
    </article>
  );
}
