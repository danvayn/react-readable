import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import PostPage from '../views/post'
import NoMatch  from '../views/NotFound'
import { fetchCommentsIfNeeded } from '../actions/comment';

class PostPageContainer extends Component {
  constructor(){
    super()
    this.state = {
      comments: []
    }
  }
  static propTypes = {
    getComments: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    post_id: PropTypes.string.isRequired,
    post: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
    postLoading: PropTypes.bool.isRequired,
  }

  componentDidUpdate(prevProps,prevState, snapshot) {
    let oldComments = prevProps.comments
    let newComments = this.props.comments
     if (oldComments !== newComments) {
      this.setState({comments: this.props.comments})
    }
  }
  componentDidMount(){
    this.props.getComments(this.props.post_id);
  }

  render(){
    const {post_id, post, postLoading} = this.props;
    const postNotFound = (postLoading === false && post === false)
    const postDisplay = postNotFound ?
      (<NoMatch location={{pathname: (`Post with id '${post_id}'`)}}/>) :
      (<PostPage post={post} comments={this.state.comments}/>)

    return (
      <div>
        {postDisplay}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const post_id = ownProps.match.params.postID;
  const post = state.posts.list.find(post => post.id === post_id)
  return {
    userName: state.users.username,
    post_id: post_id,
    post: post || false,
    comments: state.comments.list,
    postLoading: state.posts.postStatus.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (post_id) => dispatch(fetchCommentsIfNeeded(post_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPageContainer);
