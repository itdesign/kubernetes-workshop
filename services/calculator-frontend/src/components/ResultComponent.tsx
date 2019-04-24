import React from 'react';
import { BaseLayoutComponent } from './LayoutComponent';
import { reactRender } from '../utils/reactRoute';

export interface Props {
  result: number;
  backendName: string;
}

const ResultComponent: React.FunctionComponent<Props> = props => (
  <BaseLayoutComponent backendName={props.backendName}>
    <div className="alert alert-success">
      Result: <code>{props.result}</code>
    </div>
    <p>
      <a href="javascript:history.back()">Go Back</a>
    </p>
  </BaseLayoutComponent>
);

export const renderResult = (props: Props) => reactRender(ResultComponent, props);
