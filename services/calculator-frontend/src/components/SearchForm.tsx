import React from 'react';

export const SearchForm: React.FunctionComponent<{}> = () => (
  <form action="./result" method="post">
    <div className="form-group">
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          name="expression"
          placeholder="An expression e.g. 200^2"
          autoFocus={true}
        />
        <div className="input-group-append">
          <input className="btn btn-primary" type="submit" value="Calculate!" />
        </div>
      </div>
    </div>
  </form>
);
