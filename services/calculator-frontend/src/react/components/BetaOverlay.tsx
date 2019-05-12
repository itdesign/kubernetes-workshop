import React from 'react';

export const BetaOverlay: React.FunctionComponent<{}> = () => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: '85px',
      marginLeft: '50px',
      transform: 'rotate(40deg)',
      backgroundColor: '#fff',
      fontSize: '40px',
      fontWeight: 'bold',
      color: '#f00',
      zIndex: 100
    }}
  >
    developer preview
  </div>
);
