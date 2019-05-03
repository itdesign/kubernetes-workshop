import React from 'react';

import { BaseLayout } from '../layout/BaseLayout';
import { reactRender } from '../../utils/reactRender';
import { SearchForm } from '../components/SearchForm';
import { isHistoryEnabled } from '../../utils/appVersion';

const IndexContent: React.FunctionComponent<{}> = () => (
  <BaseLayout>
    <SearchForm />
    <p>{isHistoryEnabled() && <a href="history">Show History</a>}</p>
  </BaseLayout>
);

export const renderIndex = () => reactRender(IndexContent, {});
