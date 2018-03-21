import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap';
import PropTypes from 'prop-types'
import Header from './Header'
import PostList from '../components/PostList'
import { connect } from 'react-redux';

const RootPage = ({posts}) => {
 return (
   <div className="page root-page">
     <Header/>

       <header className="App-header">
         <h1 className="App-title">Welcome to React</h1>
       </header>
     <PostList posts={posts}/>
   </div>
 );}

 const mapStateToProps = (state, ownProps) => {
   return {
     posts: state.posts.list
   }
 }

let RootPageContainer = connect(mapStateToProps, null)(RootPage);
export default RootPageContainer;
