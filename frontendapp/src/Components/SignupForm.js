import React from 'react';
import PropTypes from 'prop-types';

class SignupForm extends React.Component {
  state = {
    email:'',
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };


  onHandleSubmit(e) {
   
   
    this.setState({
      email: '',
      username:'',
      password:''
     
    });

    e.preventDefault()
}


  render() {
    return (
      <div className="content-section col-md-4 container">
      <form className="form" onSubmit={e => this.props.handle_signup(e, this.state)}>

        <fieldset className="form-group">
        <legend className="border-bottom mb-4">Create account</legend>

        <div className="form-group">
        <label htmlFor="email">Email</label>
      
        <input className="form-control"
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handle_change}
        />
        </div>

        <div className="form-group">
        <label htmlFor="username">Username</label>
                <input  className="form-control"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handle_change}
                />
        </div>

        <div className="form-group">
        <label htmlFor="password">Password</label>
        <input  className="form-control"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        </div>
        </fieldset>
        <div class="form-group">
        <input className="btn btn-info" type="submit" value='sign Up'/>
        </div>
      </form>
    </div>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};