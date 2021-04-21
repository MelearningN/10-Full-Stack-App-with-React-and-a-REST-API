import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  // default states
  state = {
    emailAddress: '',
    password: '',
    serverErrors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      serverErrors,
    } = this.state;
    return (
      <main>
        <div className="form--centered">
          <h1>Sign In</h1>
          <Form 
            name={'signin'}
            cancel={this.cancel}
            submit={this.submit}
            serverErrors={serverErrors}
            submitButtonText="Sign In"
            data={() => (
              <React.Fragment>
                <label htmlFor="emailAddress">Email Address</label>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="email Address" />
                <label htmlFor="password">Password</label>
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />                
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
        </main>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;
    context.actions.signIn(emailAddress, password)
      .then((user) => {
        if (user.length) {
          this.props.history.push(from);
        } else {
          this.setState(() => {
            return {
              serverErrors:[ user.message]
            };
          });
        }
      })
      .catch((error) => {
        console.error(error);
        this.props.history.push('/error');
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}
