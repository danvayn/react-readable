import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap'

import Header from '../containers/Header'
import PostSubmit from '../components/postSubmit'
import { submitPost } from '../actions/post'


 const SubmitPostContainer = ({category, submitPost}) => {
   const formTitle = category ? (
     <h1 className="primary">Submit post to {category}</h1>
   ) : <h1 className="primary">Submit post</h1>
   return(
     <Grid>
       <Header showSort={false} currentCategory={category}/>
       {formTitle}
       <PostSubmit setCategory={category} onSubmit={submitPost}/>
     </Grid>
   )
 }

 const mapDispatchToProps = dispatch => ({
   submitPost: (post) => dispatch(submitPost(post)),
 });

 const mapStateToProps = (state, ownProps) => {
   const submissionCategory = ownProps.match.params.categoryName
   return {
     category: submissionCategory || false
   }
 }

 export default connect(mapStateToProps,mapDispatchToProps)(SubmitPostContainer);
