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
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      category: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    this.setState({ categories: this.props.categories, category: this.props.setCategory || false})
  }
  componentDidUpdate(prevProps){
    if(prevProps.categories !== this.props.categories){
    this.setState({ categories: [{name: 'select an option...'},...this.props.categories] })
    }
    console.log(this.state)
  }

  handleSubmit() {
    this.props.onSubmit({
      category: this.state.category,
      body: this.state.body,
      title: this.state.title,
      author: this.props.name,
      timestamp: Date.now()})
    console.log("form submitted!")
  }

  handleChange(e) {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({[name]: value});
  }

  render(){
    const {setCategory} = this.props
    const {category, categories} = this.state
  const categoryField = setCategory ? (
        <option value={setCategory}>{setCategory}</option>
      ) : (categories && categories.map((category,index) => (
      <option key={index}value={category.name}>{category.name}</option>)))
 return (
  <Form>
    <FormGroup controlId="formCategorySelect">
      <ControlLabel>Select a category</ControlLabel>
      <FormControl name='category' componentClass="select" onChange={(e) => this.handleChange(e)}placeholder="select" disabled={setCategory}>
       {categoryField}
      </FormControl>
    </FormGroup>
    <FormGroup controlId="formTitle">
      <ControlLabel>This is the title</ControlLabel>
      <FormControl name='title' type="text" value={this.state.title} onChange={(e) => this.handleChange(e)}placeholder="select"/>
    </FormGroup>
    <FormGroup controlId="formTitle">
      <ControlLabel>This is the body</ControlLabel>
      <FormControl name='body' componentClass="textarea" type="textarea" value={this.state.body} onChange={(e) => this.handleChange(e)}placeholder="select"/>
    </FormGroup>
    <Button onClick={this.handleSubmit}>Submit</Button>
   </Form>
  )
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitPost: (form) => dispatch(submitPost({
      title: form.title,
      body: form.body,
    })),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories.list,
    name: state.user.username
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSubmitForm)
