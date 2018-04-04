import React from 'react';
import { connect } from 'react-redux';

import AppView from './App'
import PostView from '../views/post'
import CategoryView from '../views/category'
import SubmitPost from '../views/submit'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const categoryRouter = () => {
  return (
    <Router>
      <Switch>
      <Route exact path="/submit" component={SubmitPost} />
        <Route exact path="/" component={AppView} />
        <Route exact path="/:categoryName/submit/" component={SubmitPost} />
        <Route exact path="/:categoryName/:postID" component={PostView} />
        <Route exact path="/:categoryName" component={CategoryView} />
      </Switch>
    </Router>
  )
}

export default categoryRouter
