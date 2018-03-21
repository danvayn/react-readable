import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap';
import PropTypes from 'prop-types'


class ListOfPosts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }
  render() {
    const posts = this.props.posts
    return (<div>
      <ListGroup className="post-list">

        { posts && posts.map((post,index) =>
          <ListGroupItem to="/"
                        className="post" key={post.id} href={`/${post.path}`}>
                        {post.title}
                      </ListGroupItem>
                    )}
      </ListGroup>
    </div>
  )
  }
}

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

export default ListOfPosts;
