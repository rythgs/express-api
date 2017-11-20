'use strict';
// @flow
interface User {
  name: string;
  username: string;
  password: string;
}

export default class LoginController {
  user: User = {
    name: '',
    username: '',
    password: ''
  };
  errors = {login: undefined};
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        username: this.user.username,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        this.errors.login = err.message;
      });
    }
  }
}
