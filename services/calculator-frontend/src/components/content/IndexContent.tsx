import React from 'react';

import { BaseLayout } from '../BaseLayout';
import { reactRender } from '../../utils/reactRender';
import { SearchForm } from '../SearchForm';
import { isHistoryEnabled } from '../../utils/appVersion';

const IndexContent: React.FunctionComponent<{}> = () => (
  <BaseLayout>
    <SearchForm />
    <p>{isHistoryEnabled() && <a href="history">Show History</a>}</p>
  </BaseLayout>
);

export const renderIndex = () => reactRender(IndexContent, {});
