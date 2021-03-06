import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './components/layouts/main-layout';
import SearchLayoutContainer from './components/containers/search-layout-container';

// Pages
import Home from './components/home';
import PostListContainer from './components/containers/post-list-container';
import PostFormContainer from './components/containers/post-form-container';
import PostContainer from './components/containers/post-container';
import UserListContainer from './components/containers/user-list-container';
import UserProfileContainer from './components/containers/user-profile-container';
import WidgetListContainer from './components/containers/widget-list-container';

export default (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={Home} />
        <Route path="posts">
          <Route component={SearchLayoutContainer}>
            <IndexRoute component={PostListContainer} />
          </Route>
          <Route path="new" component={PostFormContainer} />
          <Route path=":postId" component={PostContainer} />
        </Route>
        <Route path="users">
          <Route component={SearchLayoutContainer}>
            <IndexRoute component={UserListContainer} />
          </Route>
          <Route path=":userId" component={UserProfileContainer} />
        </Route>

        <Route path="widgets">
          <Route component={SearchLayoutContainer}>
            <IndexRoute component={WidgetListContainer} />
          </Route>
        </Route>

    </Route>
  </Router>
);
