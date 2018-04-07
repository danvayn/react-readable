import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap'

import Header from '../containers/Header'
import SubmitForm from '../components/submit/submitForm'
import { submitPost } from '../actions/post'


const SubmitPostContainer = ({category, submitPost}) => {
  const formTitle = category ? (
    <h2 className="primary">Submit post to {category}</h2>
    ) : <h2 className="primary">Submit post</h2>
  return(
    <div>
      <Header showSort={false} currentCategory={category}/>
      <Grid className="form-container">
        {formTitle}
        <SubmitForm setCategory={category} onSubmit={submitPost}/>
      </Grid>
    </div>
   )
 }
 SubmitPostContainer.propTypes = {
   category: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
   submitPost: PropTypes.func.isRequired,
 }
 const mapDispatchToProps = dispatch => ({
   submitPost: (post) => dispatch(submitPost(post)),
 })

 const mapStateToProps = (state, ownProps) => {
   const submissionCategory = ownProps.match.params.categoryName
   return {
     category: submissionCategory || false
   }
 }

 export default connect(mapStateToProps,mapDispatchToProps)(SubmitPostContainer);
