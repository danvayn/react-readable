import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Grid, ListGroup, ListGroupItem } from 'react-bootstrap';

import VotePanel from '../components/votePanel'
import ListedPost from './listedPost'

import { submitPostVote } from '../actions/vote'
import { sortArray } from '../utils/sort';

class ListOfPosts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
  }

  render() {
    const { voteUp, voteDown, posts, selectedSort } = this.props;
    return (
      <ListGroup className="flush post-list">
        {posts && posts.map((post,index) =>
          <ListGroupItem
            className="post-listing"
            key={post.id}
            style={{width: '100%'}}>
            <VotePanel
                voteScore={post.voteScore}
                voteUp={voteUp}
                voteDown={voteDown}
                voteID={post.id}/>
            <ListedPost className="pull-right"
              name={this.props.userName} post={post}/>
        </ListGroupItem>
        )}
      </ListGroup>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userName: state.users.username
    }
  }

const mapDispatchToProps = (dispatch) => {
  return {
    voteUp: (currentUser, voteID) => dispatch(submitPostVote(currentUser, voteID, 'upVote')),
    voteDown: (currentUser, voteID) => dispatch(submitPostVote(currentUser, voteID, 'downVote')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfPosts);
