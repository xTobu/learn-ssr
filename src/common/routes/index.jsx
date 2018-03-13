// modules/routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Wrap from '../../scenes/containers/Wrap';
import About from '../../scenes/containers/About';
import Portfolio from '../../scenes/containers/Portfolio';
import CounterContainer from '../../scenes/containers/CounterContainer';

module.exports = (
  <Route path="/" component={Wrap}>
    <IndexRoute component={About} />
    <Route path="/portfolio" component={Portfolio} />
    <Route path="/redux" component={CounterContainer} />
  </Route>
);
