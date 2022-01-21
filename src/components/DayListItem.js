import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss'

export default function DayListItem(props) {
  const {name, spots, selected, setDay} = props;
  const dayListItemClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': selected,
    'day-list__item--full': !spots
  });

  const formatSpots = () => {
    let text = '';

    if (spots > 1) {
      text = `${spots} spots remaining`;
      return text;
    } else if (spots === 1) {
      text = `${spots} spot remaining`;
      return text;
    } else {
      text = 'no spots remaining';
      return text;
    }
  };

  return (
    <li className={dayListItemClass} onClick={() => setDay(name)} selected={selected}>
      <h2 className='text--regular'>{name}</h2>
      <h3 className='text--light'>{formatSpots()}</h3>
    </li>
  );
}