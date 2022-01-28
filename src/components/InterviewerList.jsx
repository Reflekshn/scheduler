import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

import 'components/InterviewerList.scss';

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  const parsedInterviewers = interviewers.map((currInterviewer) => (
    <InterviewerListItem
      key={currInterviewer.id}
      name={currInterviewer.name}
      avatar={currInterviewer.avatar}
      selected={currInterviewer.id === value}
      setInterviewer={() => onChange(currInterviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
