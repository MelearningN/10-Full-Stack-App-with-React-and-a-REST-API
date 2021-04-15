
import React from 'react';


 const CourseDetail = ({course}) =>{
 
 return  <div className="wrap">
 <h2>Course Detail</h2>
 <form>
     <div className="main--flex">
         <div>
             <h3 className="course--detail--title">Course</h3>
             <h4 className="course--name">{course.title}</h4>
             <p>By {course.User.firstName} {course.User.lastName}</p>

             <p>{
                 course.description
             }</p>
         </div>
         <div>
             <h3 className="course--detail--title">Estimated Time</h3>
             <p>{course.estimatedTime || 'not-available'}</p>

             <h3 className="course--detail--title">Materials Needed</h3>
             <ul className="course--detail--list">
                 <li>{course.materialsNeeded || 'not-available'}</li>
             </ul>
         </div>
     </div>
 </form>
</div>}

export default CourseDetail