import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import { Form, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import FormErrors from './FormErrors'

import { submitPost } from '../actions/post'

//refactor this for use in the below html
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
  constructor () {
    super();
    this.state = {
      title: '',
      body: '',
      category: '',
      formErrors: {category: '', title: '', body: ''},
      categoryValid: false,
      titleValid: false,
      bodyValid: false,
      formValid: false,
      fireRedirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    this.setState({
      categories: this.props.categories,
      category: this.props.setCategory || false,
      categoryValid: (this.props.setCategory && (this.props.setCategory.length > 1)) || false
    })
  }
  componentDidUpdate(prevProps){
    if(prevProps.categories !== this.props.categories){
      this.setState({
        categories: [{name: 'select an option...'},
          ...this.props.categories]
      })
    }
  }

  handleSubmit() {
    this.props.onSubmit({
      category: this.state.category,
      body: this.state.body,
      title: this.state.title,
      author: this.props.name,
      timestamp: Date.now()})
    this.setState({ fireRedirect: true })
  }

  handleChange(e) {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({[name]: value},
    () => { this.validateField(name, value) });
  }

  render(){
    const {setCategory} = this.props
    const {categories, fireRedirect} = this.state

    const categoryField = setCategory ? (
          <option value={setCategory}>{setCategory}</option>
        ) : (categories && categories.map((category,index) => (
        <option key={index}value={category.name}>{category.name}</option>)))
   return (
     <div>
      <FormErrors formErrors={this.state.formErrors} />
      <Form>
        <FormGroup className={`${this.errorClass(this.state.formErrors.category)}`} controlId="formCategorySelect">
          <ControlLabel>Select a category</ControlLabel>
          <FormControl name='category' componentClass="select" onChange={(e) => this.handleChange(e)}placeholder="select" disabled={setCategory}>
           {categoryField}
          </FormControl>
        </FormGroup>
        <FormGroup className={`${this.errorClass(this.state.formErrors.title)}`} controlId="formTitle">
          <ControlLabel>Your post title</ControlLabel>
          <FormControl name='title' type="text" value={this.state.title} onChange={(e) => this.handleChange(e)}placeholder="select"/>
        </FormGroup>
        <FormGroup className={`${this.errorClass(this.state.formErrors.body)}`} controlId="formBody">
          <ControlLabel>Your post body</ControlLabel>
          <FormControl name='body' componentClass="textarea" type="textarea" value={this.state.body} onChange={(e) => this.handleChange(e)}placeholder="select"/>
        </FormGroup>
        <Button disabled={!this.state.formValid} onClick={this.handleSubmit}>Submit</Button>
       </Form>
       {fireRedirect && (
         <Redirect to={('/'+this.state.category) || '/'}/>
       )}
     </div>
    )
  }
  errorClass(error) {
   return(error.length === 0 ? '' : 'has-error');
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let titleValid = this.state.titleValid;
    let bodyValid = this.state.bodyValid;
    let categoryValid = this.state.categoryValid;

    switch(fieldName) {
      case 'category':
        const foundCat = this.props.categories.find(c => c.name === value)
        categoryValid = (value.length > 1 && typeof foundCat !== 'undefined')
        fieldValidationErrors.category = categoryValid ? '' : 'Choose a category';
        break;
      case 'title':
        titleValid = value.length >= 10;
        fieldValidationErrors.title = titleValid ? '': 'It is too short';
        break;
      case 'body':
        bodyValid = value.length >= 20;
        fieldValidationErrors.body = bodyValid ? '': 'It needs more words';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    titleValid: titleValid,
                    bodyValid: bodyValid,
                    categoryValid: categoryValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.titleValid && this.state.bodyValid && this.state.categoryValid});
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitPost: (form) => dispatch(submitPost({
      title: form.title,
      body: form.body,
    })),
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.list,
    name: state.users.username
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSubmitForm)
