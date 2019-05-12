import React from 'react';
import { BaseLayout } from '../layout/BaseLayout';
import { reactRender } from '../../utils/reactRender';
import { SearchForm } from '../components/SearchForm';

export interface Props {
  error: string;
}

const ErrorContent: React.FunctionComponent<Props> = props => (
  <BaseLayout>
    <div className="alert alert-danger">
      Oops, something went wrong!
      <br />
      <code>{JSON.stringify(props.error)}</code>
    </div>
    <p>
      <a href="./">Go Back</a>
    </p>
  </BaseLayout>
);

export const renderError = (props: Props) => reactRender(ErrorContent, props);
