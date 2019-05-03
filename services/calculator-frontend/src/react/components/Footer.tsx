import React from 'react';
import { ColoredText } from './ColoredText';

export interface Props {
  frontendInstance: string;
  backendInstance?: string;
}

export const Footer: React.FunctionComponent<Props> = props => (
  <footer
    className="footer"
    style={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
      height: '60px',
      lineHeight: '60px',
      backgroundColor: '#f5f5f5'
    }}
  >
    <div className="container">
      <span className="text-muted">
        rendered by frontend <ColoredText text={props.frontendInstance} />
        {props.backendInstance && (
          <>
            {' '}
            and calculated by backend <ColoredText text={props.backendInstance} />
          </>
        )}
      </span>
    </div>
  </footer>
);
