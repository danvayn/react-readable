import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Jumbotron, Grid, ListGroup, ListGroupItem } from 'react-bootstrap';

import VotePanel from '../votePanel'
import ListedPost from './listedPost'

import { submitPostVote } from '../../actions/vote'
import { sortArray } from '../../utils/sort';

class ListOfPosts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
  }

  render() {
    const { voteUp, voteDown, loading, posts, selectedSort } = this.props;
    const noPostsFound = (loading === false && posts.length < 1)
    return (
      <ListGroup className="flush post-list">
        {noPostsFound &&
          <Jumbotron className="pad-top">
            <h1>Uh oh!</h1>
            <p>Looks like there are no posts in this category. Submit one and be the first!</p>
          </Jumbotron>
        }
        {posts && posts.map((post,index) =>
          <ListGroupItem
            className="full-width post-listing"
            key={post.id}
          >
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
    loading: state.posts.postStatus.loading,
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
