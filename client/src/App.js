import './global.css';

import Courses from './components/Courses'
import React from 'react';
import NotFound from './components/NotFound';
import Forbidden  from './components/Forbidden';
import UnhandledError  from './components/UnhandledError';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import CourseDetail from './components/CourseDetail';
import Header from './components/Header';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './PrivateRoute'

import withContext from './Context';

// connecting to context
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

// Main container with routes
const App=() => (
    <Router>
        <div>
            <HeaderWithContext/>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/api/courses"/>
                </Route>
                <Route exact path="/api/courses"
                    component={Courses}></Route>
                <Route exact path="/api/courses/:id"
                    component={CourseDetailWithContext}></Route>
                <Route path="/signin"
                    component={UserSignInWithContext}/>
                <Route path="/signup"
                    component={UserSignUpWithContext}/>
                <Route path="/signout"
                    component={UserSignOutWithContext}/>
                <PrivateRoute  path="/courses/create" component={CreateCourseWithContext} />
                <PrivateRoute path="/course/:id/update" component={UpdateCourseWithContext} />
                <Route path="/notfound" component={NotFound}/>
                <Route path="/forbidden" component={Forbidden}/>
                <Route path="/error" component={UnhandledError}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
);

export default App;
