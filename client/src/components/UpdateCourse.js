import React, { Component } from 'react';
import Form from './Form';
import { Redirect } from 'react-router-dom';

export default class UpdateCourse extends Component {
  
    state = {
      title: '',
      description: '',
      materialsNeeded: '',
      estimatedTime: '',
      id: null,
      courseUserId: null,
      errors: []
    };

  fetchCourseById = (courseId) => {

    const { context } = this.props;

    context.data.getCourseById(courseId)
    .then(responseData => {
        
        this.setState({ title: responseData[0].title, description: responseData[0].description, materialsNeeded: responseData[0].materialsNeeded, estimatedTime: responseData[0].estimatedTime, isLoading: false, id: responseData[0].id, courseUserId: responseData[0].User.id, courseWasFound: true });
   
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  componentDidMount() {
      console.log('this.props.match.params.id', this.props.match.params.id)
    this.fetchCourseById(this.props.match.params.id);
  }

  render() {
    const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        errors
        } = this.state;
  
    return (
      <main>
      <div className="wrap">
          <h2>Update Course</h2>
          <Form 
            name={'update'}
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div>
                <input 
                  id="title" 
                  name="title" 
                  type="text"
                  value={title} 
                  onChange={this.change} 
                  className="courseTitle"
                  placeholder="Course title..." />
                  <textarea 
                  id="description" 
                  name="description" 
                  type="description"
                  value={description} 
                  onChange={this.change} 
                  placeholder="Course description..." />
                </div>
                <div>
                <input 
                  id="estimatedTime" 
                  name="estimatedTime" 
                  type="text"
                  value={estimatedTime} 
                  onChange={this.change} 
                  className="course--time--input"
                  placeholder="Hours" />
                
                <textarea 
                  id="materialsNeeded" 
                  name="materialsNeeded"
                  type="materialsNeeded"
                  value={materialsNeeded} 
                  onChange={this.change} 
                  placeholder="List materials..." />
                  </div>
              </React.Fragment>
            )} />
        </div>
        </main>
    );
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        id
    } =this.state;
   

    // Create course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    console.log('context.authenticatedUser, context.authenticatedUserPwd', context.authenticatedUser, context.authenticatedUserPwd)

    context.data.updateCourse(course, id, context.authenticatedUser, context.authenticatedUserPwd)
      .then(  this.props.history.push('/api/courses/' + id))
      .catch((err) => {
        console.log(err);
        this.props.history.push('/not-found');
      });
  
  }

  cancel = () => {
    this.props.history.push('/api/courses/' + this.props.match.params.id);
  }
}