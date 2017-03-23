import React from 'react';
import { Route } from 'react-router';
import Main from './components/main';
import Post from './components/post';
import Comments from './components/comments';

export default (
  <Route path="/" component={Main}>
    <Route path="post/:id" component={Comments} />
  </Route>
);
