import React, { Component } from 'react';
import {connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';

import UpIcon from 'react-icons/lib/fa/arrow-up'
import DownIcon from 'react-icons/lib/fa/arrow-down'

class votePanel extends Component {
    constructor(props) {
      super(props)
      this.handleVote = this.handleVote.bind(this);
      this.state = { status: '' }
  }
  static propTypes = {
    voteScore: PropTypes.number.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    voteID: PropTypes.string.isRequired,
    currentUser: PropTypes.string.isRequired,
  }
  componentDidMount() {
    this.setState({status: this.props.voteStatus[this.props.currentUser]})
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currentUser !== this.props.currentUser){
      this.setState({status: ''})
    }
  }
  handleVote(status, direction){
    const { currentUser, voteID } = this.props;
    if(direction === 'up' && status === '') {
      this.props.voteUp(currentUser, voteID);
      this.setState({status: 'upVote'})
    } else if(direction === 'up' && status === 'upVote') {
      this.props.voteDown(currentUser, voteID);
      this.setState({status: ''})
    } else if(direction === 'up' && status === 'downVote') {
      this.props.voteUp(currentUser, voteID);
      this.props.voteUp(currentUser, voteID);
      this.setState({status: 'upVote'})
    } else if(direction === 'down' && status === ''){
      this.props.voteDown(currentUser, voteID);
      this.setState({status: 'downVote'})
    } else if(direction === 'down' && status === 'downVote') {
      this.props.voteUp(currentUser, voteID);
      this.setState({status: ''})
    } else if(direction === 'down' && status === 'upVote'){
      this.props.voteDown(currentUser, voteID);
      this.props.voteDown(currentUser, voteID);
      this.setState({status: 'downVote'})
    }
  }

  render() {
    const { voteScore } = this.props;
    const stateStatus = this.state.status || ''
    return(
      <Panel className={"vote-panel " + stateStatus}>
        <Panel.Heading onClick={() => this.handleVote(stateStatus, 'up')}>
          <UpIcon className='vote-icon upvote-icon'/>
        </Panel.Heading>
        <Panel.Body>
        <span className={"vote-score"}>{voteScore}</span>
        </Panel.Body>
        <Panel.Footer onClick={() => this.handleVote(stateStatus, 'down')}>
        <DownIcon  className='vote-icon downvote-icon'/>
        </Panel.Footer>
      </Panel>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.users.username,
    voteStatus: state.users.votes[ownProps.voteID] || {}
  }
}


export default connect(mapStateToProps, null)(votePanel);
