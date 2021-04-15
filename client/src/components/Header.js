import React from 'react';
import { Link } from 'react-router-dom';

//withRouter gives the Header access to the 'this.props.location' attribute, allowing pathname
//to be set to a variable and passed to the SignIn and SignUp Link clicks (UserSignIn and UserSignUp components)
import { withRouter } from 'react-router';

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;

    const authUser = context.authenticatedUser && context.authenticatedUser[0];

    return (
      <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                {authUser ? (
              <ul className="header--signedin">
                <li className="user-logged-in">Welcome, {authUser.firstName + " " + authUser.lastName}!</li>
                <Link to="/signout">Sign Out</Link>
              </ul>
            ) : (
                <ul className="header--signedout">
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </ul>
            )}
                </nav>
            </div>
        </header>
    );
  }
};
