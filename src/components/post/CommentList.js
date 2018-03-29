import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
// import LinkContainer from 'react-router-bootstrap';
import PropTypes from 'prop-types'
// import { NavLink } from 'react-router-dom';
import VotePanel from '../../components/votePanel'
import { connect } from 'react-redux';
import { voteDownComment, voteUpComment } from '../../actions/vote'
import { destroyComments } from '../../actions/comment'
import { Row } from 'react-bootstrap';
import ListedComment from './listedComment'
import { sortArray } from '../../utils/sort';

//https://react-bootstrap.github.io/layout/media/

class ListOfComments extends Component {
  constructor(props){
    super(props);
    this.state = {
      comments: this.props.comments
    }
}
shouldComponentUpdate(nextProps, nextState){
  console.log("did this run")
    // return a boolean value
    return true;
}

  static propTypes = {
    comments: PropTypes.array.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
  }

  render() {
  const { voteUp, voteDown, comments } = this.props;
    return (
      <ListGroup className="flush comment-list">
        {comments && comments.map((comment,index) =>
          <ListGroupItem
            className="comment-listing"
            key={comment.id}>
            <VotePanel
                voteScore={comment.voteScore}
                voteUp={voteUp}
                voteDown={voteDown}
                voteID={comment.id}/>
            <ListedComment comment={comment}/>
        </ListGroupItem>
        )}
      </ListGroup>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    voteUp: (voteID) => dispatch(voteUpComment(voteID)),
    voteDown: (voteID) => dispatch(voteDownComment(voteID)),
    destroyComments: () => dispatch(destroyComments()),
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.comments.list
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfComments);

// const ListOfPosts = ({posts, postStatus}) => {
//   if(postStatus.loading === false && postStatus.error === false) {
//     return (
//       <div>
//         <ListGroup className="post-list">
//
//           { posts.map((post,index) =>
//             <ListGroupItem to="/"
//                           className="post" key={post.id} href={`/${post.path}`}>
//                           {post.title}
//                         </ListGroupItem>
//                       )}
//         </ListGroup>
//       </div>
//     )
//   } else {
//     return (<div>loading or error...</div>);
//   }
// }
//
// ListOfPosts.propTypes = {
//   posts: PropTypes.array.isRequired,
//   postStatus: PropTypes.shape({
//     loading: PropTypes.boolean,
//     error: PropTypes.boolean,
//   }).isRequired,
// };
