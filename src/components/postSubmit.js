import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { submitPost } from '../actions/post'
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
class PostSubmitForm extends Component {
  
  render(){
    const {category} = this.props
  const categoryField = category ? (
        <FormGroup controlId="formCategorySelect">
        <ControlLabel>Select a category</ControlLabel>
        <FormControl componentClass="select" placeholder="select" disabled>
          <option value={category}>{category}</option>
        </FormControl>
        </FormGroup>
      ) : (
          <FormGroup controlId="formCategorySelect">
            <ControlLabel>Select a category</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              <option value="select">select</option>
              <option value="other">...</option>
            </FormControl>
          </FormGroup>
        )

 return (
   <form onSubmit={() => submitPost()}>
   {categoryField}
    <FieldGroup
      id="formControlsTitle"
      type="text"
      label="Post Title"
      placeholder="Enter your post title here"
    />
  <FormGroup controlId="formControlsBody">
      <ControlLabel>Enter your the contents of your post here</ControlLabel>
      <FormControl componentClass="textarea" placeholder="contents.." />
    </FormGroup>

    <FormGroup>
      <ControlLabel>Static text</ControlLabel>
      <FormControl.Static>email@example.com</FormControl.Static>
    </FormGroup>

    <Button type="submit">Submit</Button>
  </form>)
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitPost: (form) => dispatch(submitPost({
      body: form.body

    })),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories.list,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSubmitForm)
