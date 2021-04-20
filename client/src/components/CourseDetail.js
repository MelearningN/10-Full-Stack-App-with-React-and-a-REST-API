import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import ReactMarkdown from 'react-markdown'

import Data from '../Data';

const markdownString=(string)=> string.split(/\r?\n/).map(value => {return "\n* " + value}).join('')


class CourseDetail extends Component {
    state = {
        course: null,
        isLoading: true,
        courseWasFound: false,
        id: null
    };
 // fetching the course by specific id, if exists
    fetchCourseById = (courseId) => {
        this.setState({course: null, isLoading: true, courseWasFound: false, id: null});
        const data = new Data();

        data.getCourseById(courseId).then(responseData => {
             if(responseData){
            this.setState({course: responseData, isLoading: false, courseWasFound: true, id: responseData.id});
             } else{
                this.props.history.push('/notFound');
             }

        }).catch(error => {
            console.log('Error fetching and parsing data', error);
            this.props.history.push('/error');
        });
    }

    componentDidMount() {
        this.fetchCourseById(this.props.match.params.id);
    }

    // delete course with proper userCredentials
    deleteCourse = (authorizedUser) => {
        const {context} = this.props;
        const currentCourse = this.state.course != null && this.state.course[0]
        if (authorizedUser) {
            context.data.deleteCourse(currentCourse.id, context.authenticatedUser, context.authenticatedUserPwd).then(this.props.history.push('/')).catch((err) => {
                console.log(err);
                this.props.history.push('/error');
            });
        } else this.props.history.push('/forbidden');
    }

    render() {
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        const currentCourse = this.state.course != null && this.state.course[0]
        const authorizedUser = authUser && authUser[0].id === currentCourse.userId
        return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                {authorizedUser && <React.Fragment> <NavLink className='button'
                        to={`/course/${currentCourse.id}/update`}>Update Course</NavLink>
                    <button className='button'
                        onClick={
                            () => this.deleteCourse(authorizedUser)
                    }>Delete Course</button>
                     </React.Fragment> }  
                    <NavLink className="button button-secondary"
                        to={'/'}>Return to List</NavLink>  
                </div>

            </div>
            {
            currentCourse ? <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{currentCourse.title}</h4>
                        <p>By {currentCourse.User.firstName} {currentCourse.User.lastName}</p>
                        {
                          <ReactMarkdown children ={currentCourse.description} />
                        }
                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{currentCourse.estimatedTime || 'not-available'}</p>
                        <h3 className="course--detail--title">Materials Needed</h3>
                       { currentCourse.materialsNeeded ?   <ReactMarkdown children={markdownString(currentCourse.materialsNeeded)} /> : "No Material found"}
                    </div>
                </div>
            </form>
           </div> : <div>Loadings..!.</div>
        } </main>)
    }
}


export default CourseDetail;
