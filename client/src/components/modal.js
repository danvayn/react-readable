import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, FormControl, Button, Modal } from 'react-bootstrap';

class oneFieldModal extends Component {
  static propTypes = {
    startingValue: PropTypes.string,
    userName: PropTypes.string.isRequired,
    relatedId: PropTypes.string.isRequired,
    optionalClass: PropTypes.string,
    placeholder: PropTypes.string,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {value: ''};
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true, value: this.props.startingValue });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({
      relatedId: this.props.relatedId,
      body: this.state.value,
      submittedBy: this.props.userName,
      timestamp: Date.now()});
    this.setState({ show: false });
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className={"modal-container " + (this.props.optionalClass || '')}>
        <a href="#show" onClick={this.handleShow}>{this.props.displayText}</a>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={() => this.handleSubmit()}>
              <FormGroup controlId={"formControlsTextarea" + this.props.relatedId}>
                <FormControl componentClass="textarea"
                  value={this.state.value}
                  placeholder={this.props.placeholder || ""}
                  onChange={(event) => this.handleChange(event)}
                />
              </FormGroup>
            </form>
            {this.props.children}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSubmit}>Submit</Button>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.users.username
    }
}

export default connect(mapStateToProps, null)(oneFieldModal);
