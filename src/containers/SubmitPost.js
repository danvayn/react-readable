import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { voteDownPost, voteUpPost } from '../actions/vote'

const SubmitPost = ({category, onSubmit}) => {

 return (<div>submit post for {category}</div>)}

 const SubmitPostContainer = ({category, submitPost}) => {
   return(<SubmitPost category={category} onSubmit={submitPost}/>)
 }

 const mapDispatchToProps = dispatch => ({
   submitPost: (post) => dispatch(voteDownPost(post)),
 });

 const mapStateToProps = (state, ownProps) => {
   const submissionCategory = ownProps.match.params.categoryName
   return {
     category: submissionCategory
   }
 }

 export default connect(mapStateToProps,mapDispatchToProps)(SubmitPostContainer);
