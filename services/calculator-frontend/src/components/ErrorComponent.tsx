import React from 'react';
import { BaseLayoutComponent } from './LayoutComponent';
import { reactRender } from '../utils/reactRoute';

export interface Props {
  error: string;
}

const ErrorComponent: React.FunctionComponent<Props> = props => (
  <BaseLayoutComponent>
    <div className="alert alert-danger">
      Oops, something went wrong!
      <br />
      <code>{JSON.stringify(props.error)}</code>
    </div>
  </BaseLayoutComponent>
);

export const renderError = (props: Props) => reactRender(ErrorComponent, props);
