import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, Row, Popover, Tooltip, Button, Modal, OverlayTrigger } from 'react-bootstrap';
import { submitReply } from '../../actions/comment'

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
    this.props.onSubmit({relatedId: this.props.relatedId, body: this.state.value, submittedBy: "dan"});
    this.setState({ show: false });
  }
  componentDidMount(){
    this.setState({modalId: this.props.relatedId});
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
        <a href="#" onClick={this.handleShow}>Reply</a>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={() => this.handleSubmit()}>
              <FormGroup controlId="formControlsTextarea">
                <FormControl componentClass="textarea" placeholder="textarea" value={this.state.value} onChange={(event) => this.handleChange(event)}/>
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

export default oneFieldModal;
