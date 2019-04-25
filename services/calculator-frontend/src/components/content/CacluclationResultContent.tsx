import React from 'react';
import { BaseLayout } from '../BaseLayout';
import { reactRender } from '../../utils/reactRoute';

export interface Props {
  result: number;
  backendInstance: string;
}

const CalculationResultContent: React.FunctionComponent<Props> = props => (
  <BaseLayout backendInstance={props.backendInstance}>
    <div className="alert alert-success">
      Result: <code>{props.result}</code>
    </div>
    <p>
      <a href="javascript:history.back()">Go Back</a>
    </p>
  </BaseLayout>
);

export const renderCalculationResult = (props: Props) => reactRender(CalculationResultContent, props);
