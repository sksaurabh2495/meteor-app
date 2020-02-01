import React, { Component } from 'react';
import { render } from 'react-dom';
import Info from './Info.jsx';

window.onload = function() {
  if(sessionStorage.getItem("key")) {
    redirectToHomePage();
  }
}

function redirectToHomePage() {
  render(<Info />, document.getElementById('react-target')); 
}

export default class LoginPage extends Component {

  state = {
    email: "",
    password: "",
    errorVisible: "hidden",
    users: ['test1', 'test2', 'test3', 'test4']
  }

  updateInputValue = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  checkCredential() {
    let flag = false;
    this.state.users.map(function(val, index) {
      if(this.state.email == val && this.state.password == val) {
        flag = true;
        sessionStorage.setItem('key', val);
      }
    }, this);

    if(flag) {
      this.setState({ errorVisible: "hidden" });
      redirectToHomePage();
    }
    else {
      this.setState({ errorVisible: "visible" });
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-label">Login</div>
        <div className="email-div">
          <label htmlFor="email">Username</label>
          <input type="email" name="email" value={this.state.email} onChange={this.updateInputValue} />
        </div>
        <div className="password-div">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.updateInputValue} />
        </div>
        <button className="login-button" onClick={() => this.checkCredential() }>Login</button>
        <div className="error-label" style={{visibility: this.state.errorVisible}}>Invalid Credentials</div>
      </div>
    );
  }
}
