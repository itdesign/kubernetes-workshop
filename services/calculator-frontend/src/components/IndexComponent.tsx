import React from 'react';

import { BaseLayoutComponent } from './LayoutComponent';
import { reactRender } from '../utils/reactRoute';

const IndexComponent: React.FunctionComponent<{}> = () => (
  <BaseLayoutComponent>
    <form action="/result" method="get">
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
  </BaseLayoutComponent>
);

export const renderIndex = () => reactRender(IndexComponent, {});
