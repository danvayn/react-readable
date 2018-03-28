import React from 'react'
import PropTypes from 'prop-types'
import Header from '../containers/Header'
import Sidebar from '../containers/Sidebar'
import PostList from '../components/PostList'
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

const RootPage = ({posts, content}) => {
 return (
   <div className="page root-page">
     <Header showSort={true}/>
     <Grid>
       <Row>
         <Col xs={12} md={8}>
         <PostList posts={posts}/>
         </Col>
         <Col xs={12} md={4}>
         <Sidebar category={"none"} body={"Navigate to a category to submit a post on it!"}/>
         </Col>
       </Row>
     </Grid>
   </div>
 );}

 const mapStateToProps = (state) => {
   return {
     posts: state.posts.list
   }
 }

let RootPageContainer = connect(mapStateToProps, null)(RootPage);
export default RootPageContainer;
