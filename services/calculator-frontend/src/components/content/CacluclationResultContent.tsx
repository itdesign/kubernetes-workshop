import React from 'react';
import { BaseLayout } from '../BaseLayout';
import { reactRender } from '../../utils/reactRender';
import { isHistoryEnabled } from '../../utils/appVersion';
import { SearchForm } from '../SearchForm';

export interface Props {
  expression: string;
  result: number;
  backendInstance: string;
}

const CalculationResultContent: React.FunctionComponent<Props> = props => (
  <BaseLayout backendInstance={props.backendInstance}>
    <SearchForm />
    <div className="alert alert-success">
      Expression: <code>{props.expression}</code>
      <br />
      Result: <code>{props.result}</code>
    </div>
    <p>
      <a href="./">Go Back</a>
      {isHistoryEnabled() && (
        <>
          {' '}
          | <a href="history">Show History</a>
        </>
      )}
    </p>
  </BaseLayout>
);

export const renderCalculationResult = (props: Props) => reactRender(CalculationResultContent, props);
