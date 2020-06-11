import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  state = {
    email: '',
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

  render() {
    return (

      <div className="content-section col-md-4 container">
      <form className="form" onSubmit={e => this.props.handle_login(e, this.state)}>
        <fieldset className="form-group">
        <legend className="border-bottom mb-4">Log In</legend>

        <div className="form-group">
        <label htmlFor="email">Email</label>
        <input  className="form-control"
          type="email"
          name="email"
          value={this.state.email}
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
        <div className="form-group">
        <input className="btn btn-info" type="submit" value='Login'/>
        </div>

        </fieldset>
      </form>
      </div>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};