import React from 'react';

export const NiceBackground: React.FunctionComponent<{}> = () => {
  const random01 = new Array(1000)
    .fill(0)
    .map(_ => Math.round(Math.random()))
    .join('');
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: -1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: 'hidden',
        opacity: 0.1,
        fontSize: '100px',
        lineHeight: '100px',
        wordWrap: 'break-word',
        textAlign: 'center'
      }}
    >
      {random01}
    </div>
  );
};
