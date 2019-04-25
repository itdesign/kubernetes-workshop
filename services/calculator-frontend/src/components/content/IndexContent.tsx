import React from 'react';

import { BaseLayout } from '../BaseLayout';
import { reactRender } from '../../utils/reactRender';
import { SearchForm } from '../SearchForm';

const IndexContent: React.FunctionComponent<{}> = () => (
  <BaseLayout>
    <SearchForm />
  </BaseLayout>
);

export const renderIndex = () => reactRender(IndexContent, {});
