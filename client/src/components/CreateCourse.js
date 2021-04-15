import React, {Component} from 'react';
import Form from './Form'

export default class CreateCourse extends Component {
    state = {
        title: '',
        author: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    }

    render() {
        const {
            title,
            author,
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
                        elements={
                            () => (
                                <React.Fragment>
                                    <div>
                                        <input id="courseTitle" name="title" type="text"
                                            value={title}
                                            onChange={
                                                this.change
                                            }
                                            placeholder="Course title"/>
                                        <input id="courseAuthor" name="author" type="text"
                                            value={author}
                                            onChange={
                                                this.change
                                            }
                                            placeholder="Course Author"/>
                                        <textarea id="courseDescription" name="description"
                                            value={description}
                                            onChange={
                                                this.change
                                            }
                                            placeholder="Course Description"/>
                                    </div>
                                    <div>
                                        <input id="estimatedTime" name="estimatedTime" type="text"
                                            value={estimatedTime}
                                            onChange={
                                                this.change
                                            }
                                            placeholder="Estimated Time"/>
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
            author,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;
        this.setState({errors: []})
        const course = {
            title,
            description,
            author,
            estimatedTime,
            materialsNeeded,
            userId: context.authenticatedUser[0].id
        };
        const userCredentials = {
            username: context.authenticatedUser[0].emailAddress,
            password: context.authenticatedUserPwd
        }

        if (title === '' || description === '') {
            if (title == '') {
                this.setState(prevState => ({
                    errors: [
                        ...prevState.errors,
                        'Title'
                    ]
                }))
                console.log('errorsssss', errors)
            }
            if (description == '') {
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
                console.log(err);
                this.props.history.push('/error');
            });
        }
    }

    cancel = () => {
        this.props.history.push('/');
    }

}
