import React, {Component} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';

import { sortPostsByOld,
sortPostsByNew,
sortPostsByLowestVote,
sortPostsByHighestVote, } from '../../actions/sort';

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
      <div style={{position:'relative', height:'50px'}}className="sort-tabs">
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="post-sort-tabs"
      >
        <Tab eventKey={1} title="top">
        </Tab>
        <Tab eventKey={2} title="bottom">
        </Tab>
        <Tab eventKey={3} title="new">
        </Tab>
        <Tab eventKey={4} title="old">
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
