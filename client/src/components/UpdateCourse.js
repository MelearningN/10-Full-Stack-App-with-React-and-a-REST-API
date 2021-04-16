import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
  
  // default states
    state = {
      title: '',
      description: '',
      materialsNeeded: '',
      estimatedTime: '',
      id: null,
      courseUserId: null,
      errors: []
    };

    // fetching courses by specific id
  fetchCourseById = (courseId) => {

    const { context } = this.props;

    context.data.getCourseById(courseId)
    .then(responseData => {
    this.setState({ title: responseData[0].title, description: responseData[0].description, materialsNeeded: responseData[0].materialsNeeded, estimatedTime: responseData[0].estimatedTime, isLoading: false, id: responseData[0].id, courseUserId: responseData[0].User.id, courseWasFound: true });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  componentDidMount() {
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
            data={() => (
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

    context.data.updateCourse(course, id, context.authenticatedUser, context.authenticatedUserPwd)
      .then(  this.props.history.push('/api/courses/' + id))
      .catch((err) => {
        console.log(err);
      });
  }
// cancel button redirects user
  cancel = () => {
    this.props.history.push('/api/courses/' + this.props.match.params.id);
  }
}