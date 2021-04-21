import config from './config';

export default class Data {
  // api method to send server requests
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  //GET Users, pass in auth using credentials username and password
  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200 || 401) {
      return response.json().then(data => data);
    }
    // If user is unauthorized
    else if (response.status === 401) {
      return response;
    }
    //Unexpected Error
    else {
      throw new Error();
    }
  }
  
  //POST Users, create the user
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    // If user sends a bad request
    else if (response.status === 400) {
      return response.json().then(data => data);
    }
    //Unexpected Error
    else {
      throw new Error();
    }
  }

  //GET Courses
  async getCourses() {
    const response = await this.api('/courses/', 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    // requested course doesn't exist
    else if (response.status === 404) {
      return response.json().then(data => data);
    }
    //Unexpected Error
    else {
      throw new Error();
    }
  }

  //GET specific course
  async getCourseById(id) {
    const response = await this.api('/courses/' + id, 'GET');
    if (response.status === 200) {    
      return response.json().then(data => data);
    }
    //GET courses doesn't exist
    else if (response.status === 400) {
      return null;
    }
    //unexpected Error
    else {
      throw new Error();
    }
  }

  //POST Courses with proper userCredentials
  async createCourse(course, userCredentials) {
    const response = await this.api('/courses', 'POST', course, true, userCredentials);
    if (response.status === 201) {
      return [];
    }
    // If user sends a bad request
    else if (response.status === 400) {
      return response.json().then(data => data);
      }
     //unexpected Error
    else {
      throw new Error();
    }
  }

  //PUT Course update with proper userCredentials
  async updateCourse(course, id, user, password) {
    const username = user[0].emailAddress;
    const response = await this.api('/courses/' + id, 'PUT', course, true, {username, password});
    if (response.status === 204) {
      return [];
    }
   // If user sends a bad request
    else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    }
   //unexpected Error
    else {
      throw new Error();
    }
  }

  //DELETE Course with specific userCredentials
  async deleteCourse(id, user, password) {
    const username = user[0].emailAddress;
    const response = await this.api('/courses/' + id, 'DELETE', null, true, {username, password});
    if (response.status === 204) {
      return [];
    }
      // If user sends a bad request
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    //unexpected Error
    else {
      throw new Error();
    }
  }
}