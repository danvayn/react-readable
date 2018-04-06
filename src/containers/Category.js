import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AppView from './App'
import PostView from './Post'
import Category from '../views/category'
import SubmitPost from './Submit'
import NoMatch  from '../views/NotFound'

const categoryRouter = () => {
  return (
    <Router>
      <Switch>
      <Route exact path="/submit" component={SubmitPost} />
        <Route exact path="/" component={AppView} />
        <Route exact path="/:categoryName/submit/" component={SubmitPost} />
        <Route exact path="/:categoryName/:postID" component={PostView} />
        <Route exact path="/:categoryName" component={CategoryContainer} />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state, ownProps) => {
  const searchedCategory = ownProps.match.params.categoryName
  const category = state.categories.list.find(category => category.name === searchedCategory)
  return {
    searchedCategory: searchedCategory,
    category: category || false,
    categoryLoading: state.categories.categoryStatus.loading,
    posts: state.posts.list.filter(post => post.category === searchedCategory)
  }
}

class CategoryView extends Component {
  render(){
    const {posts, searchedCategory, category, categoryLoading} = this.props;
    const categoryNotFound = (categoryLoading === false && category === false)
    const categoryName = category.name
    const categoryDisplay = categoryNotFound ?
      (<NoMatch location={{pathname: ('category with name \''+searchedCategory+'\'')}}/>)
      : (<Category posts={posts} category={categoryName}/>)
    return (
      <div>
        {categoryDisplay}
      </div>
    )
  }
}

const CategoryContainer = connect(mapStateToProps, null)(CategoryView)
export default categoryRouter
