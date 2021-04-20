import React, {Component} from 'react';
import Form from './Form'

export default class CreateCourse extends Component {
   // default states
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
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
                    <h2>Create Courses</h2>
                    <Form cancel={
                            this.cancel
                        }
                        submit={
                            this.submit
                        }
                        errors={errors}
                        submitButtonText="Create Course"
                        data={
                            () => (
                                <React.Fragment>
                                    <div>
                                    <label for="title">Title</label>
                                        <input id="courseTitle" name="title" type="text"
                                            value={title}
                                            onChange={
                                                this.change
                                            }
                                            placeholder="Course title"/>
                                            <div className="author-name">By {this.props.context.authenticatedUser[0].firstName} {this.props.context.authenticatedUser[0].lastName}</div>
                                            <label for="description">Description</label>
                                        <textarea id="courseDescription" name="description"
                                            value={description}
                                            onChange={
                                                this.change
                                            }
                                            placeholder="Course Description"/>
                                    </div>
                                    <div>
                                    <label for="estimatedTime">Estimated Time</label>
                                        <input id="estimatedTime" name="estimatedTime" type="text"
                                            value={estimatedTime}
                                            onChange={
                                                this.change
                                            }
                                            placeholder="Estimated Time"/>
                                        <label for="materialsNeeded">Materials Needed</label>
                                        <textarea id="materialsNeeded" name="materialsNeeded"
                                            value={materialsNeeded}
                                            onChange={
                                                this.change
                                            }
                                            placeholder="materialsNeeded"/>
                                    </div>
                                </React.Fragment>
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

        // form validation
        if (title === '' || description === '') {
            if (title === '') {
                this.setState(prevState => ({
                    errors: [
                        ...prevState.errors,
                        'Title'
                    ]
                }))
            }
            if (description === '') {
                this.setState(prevState => ({
                    errors: [
                        ...prevState.errors,
                        'Descrition'
                    ]
                }))
            }
        } else {
            this.setState({errors: []})
            context.data.createCourse(course, userCredentials)
            .then(
              this.props.history.push('/')
            )
            .catch((err) => {
                this.props.history.push('/error');
            });
        }
    }

    cancel = () => {
        this.props.history.push('/');
    }

}
