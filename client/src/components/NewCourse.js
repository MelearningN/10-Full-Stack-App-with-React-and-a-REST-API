import React from 'react';
import {
    NavLink
  } from "react-router-dom";
  import Cookies from 'js-cookie';

  // new course component appears in home page
const NewCourse=()=>
            <React.Fragment>
                  <NavLink className="course--module course--add--module" to={Cookies.getJSON('authenticatedUser')?'/course/create': '/signin'}>
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </NavLink>
            </React.Fragment>

export default NewCourse
