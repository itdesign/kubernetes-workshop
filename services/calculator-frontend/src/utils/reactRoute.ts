import React from 'react';
import express = require('express');
import { renderToString } from 'react-dom/server';

export const reactRender = <P>(component: React.FunctionComponent<P>, props: P) =>
  renderToString(React.createElement(component, props));
