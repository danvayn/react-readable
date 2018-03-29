import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, Row, Popover, Tooltip, Button, Modal, OverlayTrigger } from 'react-bootstrap';
import { connect } from 'react-redux';
import { submitReply } from '../../actions/comment'

class CommentModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {value: ''};
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.submitReply({body: this.state.value, timestamp: Date.now(), parentId: this.props.replyID, author: "dan"});
    this.setState({ show: false });
  }
  handleChange(e) {
    this.setState({value: e.target.value});
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
            <Modal.Title>Submit a comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <FormGroup controlId="formControlsTextarea">
                <FormControl componentClass="textarea" placeholder="textarea" value={this.state.value} onChange={e=> this.handleChange(e)}/>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitReply: (reply) => dispatch(submitReply(reply)),
  };
};

export default connect(null, mapDispatchToProps)(CommentModal);
