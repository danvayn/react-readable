import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommentTabs from '../tabs'

import { sortCommentsByOld,
sortCommentsByNew,
sortCommentsByLowestVote,
sortCommentsByHighestVote, } from '../../actions/sort';


class CommentSort extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1
    };
  }

  handleSelect(key) {
    this.setState({ key });
    this.sortComments(key);
  }
  sortComments(key){
    if(key === 1) {
      this.props.sortByHighestVotes();
    } else if (key === 2) {
      this.props.sortByLowestVotes();

    } else if (key === 3) {
      this.props.sortByNewest();

    } else if (key === 4) {
      this.props.sortByOldest();

    }
  }

  render() {
    return (
      <CommentTabs
      id="comment-sort" activeKey={this.state.key} onSelect={this.handleSelect} />
    )
  }
}

CommentSort.propTypes = {
  sortByHighestVotes: PropTypes.func.isRequired,
  sortByLowestVotes: PropTypes.func.isRequired,
  sortByNewest: PropTypes.func.isRequired,
  sortByOldest: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  sortByNewest: () => {
    dispatch(sortCommentsByNew());
  },
  sortByOldest: () => {
    dispatch(sortCommentsByOld());
  },
  sortByHighestVotes: () => {
    dispatch(sortCommentsByHighestVote());
  },
  sortByLowestVotes: () => {
    dispatch(sortCommentsByLowestVote());
  },
});

export default connect(null, mapDispatchToProps)(CommentSort);
