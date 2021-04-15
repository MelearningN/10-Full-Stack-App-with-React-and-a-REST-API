import React from 'react';
import {
    NavLink
  } from "react-router-dom";

const Course=({course})=>
<React.Fragment>
     <NavLink className="course--module" to={`/api/courses/${course.id}`}>
     <h2 className="course--label">Course</h2>
     <h3 className="course--title">{course.title}</h3>
 </NavLink>

 </React.Fragment>

 export default Course