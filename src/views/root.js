import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import Header from '../containers/Header'
import Sidebar from '../components/Sidebar'
import PostList from '../components/PostList'

const RootPage = ({posts, content}) => {
 return (
   <div className="page root-page">
     <Header showSort={true}/>
     <Grid fluid className="content-container">
       <Row>
         <Col xs={12} md={8}>
         <PostList posts={posts}/>
         </Col>
         <Col xs={12} md={4}>
         <Sidebar>
           Welcome to the website. This is the sidebar you'll be seeing on category pages.
         </Sidebar>
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
