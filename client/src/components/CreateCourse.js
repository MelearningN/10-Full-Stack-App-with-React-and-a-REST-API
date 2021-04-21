import React, {Component} from 'react';
import Form from './Form'

export default class CreateCourse extends Component {
   // default states
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        serverErrors: []
    }

    render() {
        console.log('wwwwww')
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            serverErrors
        } = this.state;

        return (
            <main>
                <div className="wrap">
                    <h2>Create Courses</h2>
                    <Form cancel={
                            this.cancel
                        }
                        submit={
                            this.submit
                        }
                        serverErrors={serverErrors}
                        submitButtonText="Create Course"
                        data={
                            () => (
                                <div className="main--flex">
                                    <div>
                                    <label htmlFor="title">Title</label>
                                        <input id="courseTitle" name="title" type="text"
                                            value={title}
                                            onChange={
                                                this.change
                                            }
                                            placeholder="Course title"/>
                                            <label htmlFor="author">Course Author</label>
                                             <input className="author-name" name="author" type="text"
                                            value={`${this.props.context.authenticatedUser[0].firstName} ${this.props.context.authenticatedUser[0].lastName}`} readOnly/>
                                            <label htmlFor="description">Description</label>
                                        <textarea id="courseDescription" name="description"
                                            value={description}
                                            onChange={
                                                this.change
                                            }
                                            placeholder="Course Description"/>
                                    </div>
                                    <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                        <input id="estimatedTime" name="estimatedTime" type="text"
                                            value={estimatedTime}
                                            onChange={
                                                this.change
                                            }
                                            placeholder="Estimated Time"/>
                                        <label htmlFor="materialsNeeded">Materials Needed</label>
                                        <textarea id="materialsNeeded" name="materialsNeeded"
                                            value={materialsNeeded}
                                            onChange={
                                                this.change
                                            }
                                            placeholder="materialsNeeded"/>
                                    </div>
                                </div>
                            )
                        }/>
                </div>
        </main>
        )
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(() => {
            return {[name]: value};
        });
    }

    submit = () => {
        const {context} = this.props;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;
        this.setState({errors: []})
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: context.authenticatedUser[0].id
        };
        // user creditials object
        const userCredentials = {
            username: context.authenticatedUser[0].emailAddress,
            password: context.authenticatedUserPwd
        }
 
         //   this.setState({errors: []})
            context.data.createCourse(course, userCredentials).then(data => {
                if (data.length ===0) {
              this.props.history.push('/')
                }
                else {
                    this.setState({serverErrors: data.errors});
                  }
                }).catch((err) => {
                this.props.history.push('/error');
            });
    }

    cancel = () => {
        this.props.history.push('/');
    }

}
