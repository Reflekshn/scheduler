import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
  const { interviewers,interviewer, setInterviewer } = props;

  const parsedInterviewers = interviewers.map(currInterviewer => (
    <InterviewerListItem
      id={currInterviewer.id}
      name={currInterviewer.name}
      avatar={currInterviewer.avatar}
      selected={currInterviewer.id === interviewer}
      setInterviewer={() => setInterviewer(currInterviewer.id)}
    />
  ));

  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'></ul>
    </section>
  )
}