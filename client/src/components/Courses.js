import React, {Component} from 'react';

import NewCourse from './NewCourse';
import Course from './Course'
import Data from '../Data'

class Courses extends Component {
    state = {
        courses: [],
        isLoading: true
    }
    fetchCourses = () => {
        // when loading the page, empty the state variables
        // so the render will show default state while the images load
        this.setState({courses: [], isLoading: true});
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
             <Course course={course} key={course.id}/>) : 
            <div>Loadings.!..</div> }
             <NewCourse />
             </div>
            
             </main>
        )
    }
}

export default Courses