import React from 'react';
import md5 from 'md5';

interface Props {
  text: string;
}

export const ColoredText: React.FunctionComponent<Props> = props => {
  const hue =
    md5(props.text)
      .split('')
      .reduce((agg, cur) => (agg = agg + cur.charCodeAt(0)), 0) % 360;
  const backgroundColor = `hsl(${hue}, 60%, 60%)`;
  return (
    <span style={{ backgroundColor, borderRadius: '3px', padding: '2px', color: '#fff', fontFamily: 'monospace' }}>
      {props.text}
    </span>
  );
};
