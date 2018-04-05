import React from 'react';

import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const categoryBar = ({categories}) => {
  const categoryLength = categories.length-1
  return (
    <div className="categories-bar">
          <NavLink exact to="/" activeClassName="selected">
            Home
          </NavLink>
         { categories && categories.map((category, index) => (
           <span key={index} className="category-listing">

            <span>{categoryLength < index ? '' : ' - '}</span>
           <NavLink activeClassName="selected" className="inline" key={index} to={`/${category.path}/`}>
                 {category.name}
               </NavLink>
            </span>
         ))
        }
   </div>
 );
}

export default categoryBar;
