import React from 'react';

export interface Props {
  children?: React.ReactNode;
}

export const BaseLayoutComponent: React.FunctionComponent<Props> = props => (
  <html>
    <head>
      <title>Calculator Frontend</title>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
    </head>
    <body className="d-flex flex-column h-100">
      <main role="main" className="flex-shrink-0">
        <div className="container" style={{ width: 'auto', maxWidth: '680px', padding: '0 15px' }}>
          <h1 className="mt-5">Calculator Frontend 1.0-beta1</h1>
          <p className="lead">
            This service provides a basic calculator functionality.
            <br />
            It will help you to solve common math problems.
          </p>
          {props.children}
        </div>
      </main>
    </body>
  </html>
);
