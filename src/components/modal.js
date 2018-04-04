import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, Row, Popover, Tooltip, Button, Modal, OverlayTrigger } from 'react-bootstrap';
import { connect } from 'react-redux';

class oneFieldModal extends React.Component {
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
    this.setState({ show: true });
  }
  handleSubmit() {
    this.props.onSubmit({
      relatedId: (this.props.relatedId || ''),
      body: this.state.value,
      submittedBy: this.props.userName,
      timestamp: Date.now()});
    this.setState({ show: false });
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    return (
      <div>
        <a href="#show" onClick={this.handleShow}>{this.props.displayText}</a>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={() => this.handleSubmit()}>
              <FormGroup controlId="formControlsTextarea">
                <FormControl componentClass="textarea" placeholder={this.props.placeholder || ""} value={this.props.startingValue} onChange={(event) => this.handleChange(event)}/>
              </FormGroup>
            </form>
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

const mapStateToProps = (state, ownProps) => {
  return {
    userName: state.user.username
    }
  }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps, null)(oneFieldModal);
