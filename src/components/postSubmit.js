import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
const PostSubmit = ({category, onSubmit}) => {
  function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

 return (<div>submit post for {category}</div>)

}
export default PostSubmit
