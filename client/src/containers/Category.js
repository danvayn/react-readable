import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Category from '../views/category'
import NoMatch  from '../views/NotFound'

const CategoryView = ({searchedCategory, category, categoryLoading, posts}) => {
  const categoryNotFound = (categoryLoading === false && category === false)
  const categoryDisplay = categoryNotFound ?
    (<NoMatch location={{pathname: ('category with name \''+searchedCategory+'\'')}}/>)
    : (<Category posts={posts} category={category.name}/>)
  return (
    <div>
      {categoryDisplay}
    </div>
  )
}

CategoryView.propTypes = {
    searchedCategory: PropTypes.string.isRequired,
    category: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
    categoryLoading: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
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


const CategoryContainer = connect(mapStateToProps, null)(CategoryView)
export default CategoryContainer
