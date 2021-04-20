import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component { // default states
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: [],
        serverError:[]
    }

    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors,
            serverError
        } = this.state;
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <Form name={'signup'}
                        cancel={
                            this.cancel
                        }
                        submit={
                            this.submit
                        }
                        submitButtonText="Sign Up"
                        errors={errors}
                        serverError={serverError}
                        data={
                            () => (
                                <React.Fragment>
                                    <input id="firstName" name="firstName" type="text"
                                        value={firstName}
                                        onChange={
                                            this.change
                                        }
                                        placeholder="First Name"/>
                                    <input id="lastName" name="lastName" type="text"
                                        value={lastName}
                                        onChange={
                                            this.change
                                        }
                                        placeholder="Last Name"/>
                                    <input id="emailAddress" name="emailAddress" type="text"
                                        value={emailAddress}
                                        onChange={
                                            this.change
                                        }
                                        placeholder="Email Address"/>
                                    <input id="password" name="password" type="password"
                                        value={password}
                                        onChange={
                                            this.change
                                        }
                                        placeholder="Password"/>
                                    <input id="confirmPassword" name="confirmPassword" type="password"
                                        value={confirmPassword}
                                        onChange={
                                            this.change
                                        }
                                        placeholder="Confirm Password"/>
                                </React.Fragment>
                            )
                        }/>
                    <p>
                        Already have a user account?
                        <Link to="/signin">Click here</Link>
                        to sign in!
                    </p>
                </div>
            </div>
        );
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
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state;
        this.setState({errors: []})

        // Create user
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        };

        // user form validation
        if (firstName === '' || lastName === '' || emailAddress === '' || password === '' || confirmPassword === '') {
            if (firstName === '') {
                this.setState(prevState => ({
                    errors: [
                        ...prevState.errors,
                        'firstName'
                    ]
                }))
            }
            if (lastName === '') {
                this.setState(prevState => ({
                    errors: [
                        ...prevState.errors,
                        'lastName'
                    ]
                }))
            }
            if (emailAddress === '') {
                this.setState(prevState => ({
                    errors: [
                        ...prevState.errors,
                        'emailAddress'
                    ]
                }))
            }
            if (password === '') {
                this.setState(prevState => ({
                    errors: [
                        ...prevState.errors,
                        'password'
                    ]
                }))
            }
            if (confirmPassword !== password) {
                this.setState(prevState => ({
                    errors: [
                        ...prevState.errors,
                        'confirmPassword'
                    ]
                }))
            }

        } else { // when there is no error then create a user
            context.data.createUser(user).then(data => {
                if (data.errors.length > 0) {
                    this.setState({serverError: data.errors});
                } else {
                    context.actions.signIn(emailAddress, password).then(() => {
                        this.props.history.push('/');
                    });
                }
            }).catch(err=>{
              this.setState({
                serverError: err.errors
            })
            });
        }
    }

    cancel = () => {
        this.props.history.push('/');
    }
}
