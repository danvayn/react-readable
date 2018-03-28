import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
// import LinkContainer from 'react-router-bootstrap';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import VotePanel from '../components/votePanel'
import { connect } from 'react-redux';
import { voteDownPost, voteUpPost } from '../actions/vote'
import { ListedPost } from '../components/listedPost'

//https://react-bootstrap.github.io/layout/media/

class ListOfPosts extends Component {

      //<ListedPost voteUp={voteUp} voteDown={voteDown} post={post}/>

  static propTypes = {
    posts: PropTypes.array.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
  }
  render() {
    const { voteUp, voteDown, posts } = this.props;

    return (
      <ListGroup className="flush post-list">
        {posts && posts.map((post,index) =>
          <ListGroupItem
            className="post-listing"
            key={post.id}>
            <VotePanel
                voteScore={post.voteScore}
                voteUp={voteUp}
                voteDown={voteDown}
                voteID={post.id}/>

            <NavLink to={"/post/" + post.id}>
              <h4 className="list-group-item-heading">{post.title}</h4>
            </NavLink>
            <NavLink to={"/post/" + post.id}>
              {post.commentCount} comments
            </NavLink>
            <Badge>/r/{post.category}</Badge>

        </ListGroupItem>
        )}
      </ListGroup>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    }
  }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    voteUp: (voteID) => dispatch(voteUpPost(voteID)),
    voteDown: (voteID) => dispatch(voteDownPost(voteID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfPosts);

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
