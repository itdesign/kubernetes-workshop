import React from 'react';
import { BaseLayoutComponent } from './LayoutComponent';
import { reactRender } from '../utils/reactRoute';

export interface Props {
  result: number;
}

const ResultComponent: React.FunctionComponent<Props> = props => (
  <BaseLayoutComponent>
    <div className="alert alert-success">
      Result: <code>{props.result}</code>
    </div>
    <a href="javascript:history.back()">Go Back</a>
  </BaseLayoutComponent>
);

export const renderResult = (props: Props) => reactRender(ResultComponent, props);
