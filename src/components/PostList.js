import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
// import LinkContainer from 'react-router-bootstrap';
import PropTypes from 'prop-types'
import VotePanel from '../components/votePanel'
import { connect } from 'react-redux';
import { submitPostVote } from '../actions/vote'
import ListedPost from './listedPost'
import { sortArray } from '../utils/sort';

//https://react-bootstrap.github.io/layout/media/

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
              <ListedPost className="pull-right" name={this.props.userName} post={post}>
                {
                //https://codeburst.io/a-quick-intro-to-reacts-props-children-cb3d2fce4891
                //add delete button here
                }
              </ListedPost>
        </ListGroupItem>
        )}
      </ListGroup>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    userName: state.user.username
    }
  }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    voteUp: (currentUser, voteID) => dispatch(submitPostVote(currentUser, voteID, 'upVote')),
    voteDown: (currentUser, voteID) => dispatch(submitPostVote(currentUser, voteID, 'downVote')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfPosts);
