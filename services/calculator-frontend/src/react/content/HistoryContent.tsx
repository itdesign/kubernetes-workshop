import React from 'react';
import { BaseLayout } from '../layout/BaseLayout';
import { reactRender } from '../../utils/reactRender';

export interface Props {
  records: [{ expression: string; result: string }];
  backendInstance: string;
}

const HistoryContent: React.FunctionComponent<Props> = props => (
  <BaseLayout backendInstance={props.backendInstance}>
    <table className="table">
      <thead>
        <tr>
          <th>Expression</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {props.records.map((record, idx) => (
          <tr key={idx}>
            <td>
              <code>{record.expression}</code>
            </td>
            <td>
              <code>{record.result}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <p>
      <a href="./">Go Back</a>
    </p>
  </BaseLayout>
);

export const renderHistory = (props: Props) => reactRender(HistoryContent, props);
