import React from 'react'
import classNames from 'classnames'
import 'components/InterviewerListItem.scss'

export default function InterviewerListItem(props) {
  const {id, name, avatar, selected, setInterviewer} = props;

  const interviewerClass = classNames({
    'interviewers__item--selected': props.selected
  });

  return (
    <li className={interviewerClass} onClick={() => setInterviewer(id)}>
      <img
        className='interviewers__item-image'
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}