
import React, { Component } from 'react';
import Nav from './Components/Nav';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      email:'', 
      error:''

    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        }).catch(error = ()=>{
      console.log(error);
      
        })

    console.log('You have logged in');
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    console.log(data)
    fetch('http://localhost:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username,
          email:json.email

        });
      }).catch(err=> console.log(err));
  };

  handle_signup = (e, data) => {
    e.preventDefault();
   
    fetch('http://localhost:8000/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    
    })
    console.log(data)
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username,
          email:json.user.email
        });
      }).catch(err => { 
        this.setState({errorMessage: err.message});
      })
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    { this.state.errorMessage && <h3 className="error"> { this.state.errorMessage } </h3> }
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login}  />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : 'Please Log In'}
        </h3>
      </div>
    );
  }
}

export default App;