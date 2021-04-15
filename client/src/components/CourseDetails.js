import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {
    NavLink
  } from "react-router-dom";


import CourseDetail from './CourseDetail'

import Data from '../Data';


class CourseDetails extends Component {
    state = {
        course: null,
        isLoading: true,
        courseWasFound: false,
        id: null
    };


    fetchCourseById = (courseId) => {
        this.setState({course: null, isLoading: true, courseWasFound: false, id: null});
        const data = new Data();
        
        data.getCourseById(courseId).then(responseData => {
            this.setState({course: responseData, isLoading: false, courseWasFound: true, id: responseData.id});
            
        }).catch(error => {
            console.log('Error fetching and parsing data', error);
            this.props.history.push('/not-found')
        });
    }

  
    componentDidMount() {
        this.fetchCourseById(this.props.match.params.id);
    }

    deleteCourse = (e, authorizedUser) => {
        const { context } = this.props;
        const currentCourse= this.state.course != null && this.state.course[0]
       
        if(authorizedUser){
            context.data.deleteCourse(currentCourse.id, context.authenticatedUser, context.authenticatedUserPwd)
            .then(this.props.history.push('/')
            )
            .catch((err) => {
              console.log(err);
              this.props.history.push('/error');
            });
        }
      }

    render() {
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        console.log('auth', authUser)
       const currentCourse= this.state.course != null && this.state.course[0]
      const authorizedUser= authUser && authUser[0].id === currentCourse.userId
       return(
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <NavLink className='button'  to={authUser? (authorizedUser ? `/course/${currentCourse.id}/update`: '/forbidden'): '/signin'}>Update Course</NavLink>
                    <button className= 'button' onClick={()=>this.deleteCourse(authorizedUser)}>Delete Course</button>
                    <NavLink className="button button-secondary" to={'/'}>Return to List</NavLink>
                </div>
           
                </div>            
            {currentCourse ? <CourseDetail course={currentCourse}/> : <div>Loadings..!.</div>}
            
            </main>   
        )
    }
}


export default CourseDetails;
