import React, {Component} from 'react';
import {
    NavLink
  } from "react-router-dom";
import NewCourse from './NewCourse';

import Data from '../Data'

class Courses extends Component {
    state = {
        courses: [],
        isLoading: true
    }
    // fetching all the courses when component in mounted
    fetchCourses = () => {
        const data = new Data();
        data.getCourses().then(responseData => {
            this.setState({courses: responseData, isLoading: false});
       
        }).catch(error => {
            console.log('Error fetching and parsing data', error);
        });
    }

    componentDidMount() {
        this.fetchCourses();
    }
    
    render() {
        return (
            <main>
            <div className="wrap main--grid">
            {!this.state.loading ? 
            this.state.courses.map(course => 
                <NavLink key={course.id} className="course--module" to={`/courses/${course.id}`}>
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">{course.title}</h3>
            </NavLink>) : 
            <div>Loadings.!..</div> }
             <NewCourse />
             </div>
             </main>
        )
    }
}

export default Courses
