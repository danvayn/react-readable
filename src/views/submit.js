import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap'

import Header from '../containers/Header'
import PostSubmit from '../components/postSubmit'
import { submitPost } from '../actions/post'


 const SubmitPostContainer = ({category, submitPost}) => {
   const formTitle = category ? (
     <h2 className="primary">Submit post to {category}</h2>
   ) : <h2 className="primary">Submit post</h2>
   return(
     <div>
     <Header showSort={false} currentCategory={category}/>
     <Grid className="content-container" fluid>
       {formTitle}
       <PostSubmit setCategory={category} onSubmit={submitPost}/>
     </Grid>
   </div>
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
