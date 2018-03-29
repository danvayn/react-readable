import React, {Component} from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sortPostsByOld,
sortPostsByNew,
sortPostsByLowestVote,
sortPostsByHighestVote, } from '../../actions/post';

class PostSort extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1
    };
  }

  handleSelect(key) {
    this.setState({ key });
    this.sortPosts(key);
  }
  sortPosts(key){
    
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
      <div className="sort-tabs">
        Sort by
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Upvotes">
        </Tab>
        <Tab eventKey={2} title="Downvotes">
        </Tab>
        <Tab eventKey={3} title="Newest">
        </Tab>
        <Tab eventKey={4} title="Oldest">
        </Tab>
      </Tabs>
    </div>
    )
  }
}

PostSort.propTypes = {
  sortByHighestVotes: PropTypes.func.isRequired,
  sortByLowestVotes: PropTypes.func.isRequired,
  sortByNewest: PropTypes.func.isRequired,
  sortByOldest: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   highlightTabNewest: state.post.sortPosts.newest,
//   highlightTabOldest: state.post.sortPosts.oldest,
//   highlightTabLowest: state.post.sortPosts.lowest,
//   highlightTabHighest: state.post.sortPosts.highest,
// });

const mapDispatchToProps = dispatch => ({
  sortByNewest: () => {
    dispatch(sortPostsByNew());
  },
  sortByOldest: () => {
    dispatch(sortPostsByOld());
  },
  sortByHighestVotes: () => {
    dispatch(sortPostsByHighestVote());
  },
  sortByLowestVotes: () => {
    dispatch(sortPostsByLowestVote());
  },
});

export default connect(null, mapDispatchToProps)(PostSort);