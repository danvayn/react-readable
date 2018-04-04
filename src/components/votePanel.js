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
  handleVote(status='', direction){
    const { currentUser, voteID } = this.props;
    console.log(this.props);
    console.log("XXX-"+status);
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

    // this.setState({comments: this.state.comments.filter(comment => comment.id !== comment_id)})
  }

  render() {
    const { currentUser, voteStatus, voteScore, voteID } = this.props;
    const divStyle = {
      margin: '40px',
      border: '5px solid pink'
    };
    const panelStyle = {
      textAlign: 'center',
      maxWidth: '50px',
      minWidth: '25px',
      marginLeft: '-30px',
      marginBottom: '0px',
      boxSizing: 'content-box',
      display: 'inline-block'}

    return(
      <Panel style={panelStyle} className={"vote-panel voted-" + this.state.status}>
        <Panel.Heading style={{padding: '0'}} onClick={() => this.handleVote(this.state.status, 'up')}>
          <UpIcon className='upvote-icon' style={{pointerEvents: 'none'}}/>
        </Panel.Heading>
        <Panel.Body style={{padding: '5px'}}>
        <span className={"score score-"+ this.state.status}>{voteScore}</span>
        </Panel.Body>
        <Panel.Footer style={{padding: '0'}}  onClick={() => this.handleVote(this.state.status, 'down')}>
        <DownIcon  className='downvote-icon' style={{pointerEvents: 'none'}}/>
        </Panel.Footer>
      </Panel>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps, state)
  return {
    currentUser: state.user.username,
    voteStatus: state.user.votes[ownProps.voteID] || {}
  }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     getPost: (post_id) => dispatch(fetchPost(post_id)),
//     getComments: (post_id) => dispatch(fetchCommentsIfNeeded(post_id)),
// }
// }


export default connect(mapStateToProps, null)(votePanel);
