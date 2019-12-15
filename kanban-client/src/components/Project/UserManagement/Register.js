import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createNewUser } from '../../../actions/securityActions';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    this.props.createNewUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className='register'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Sign Up</h1>
                <p className='lead text-center'>Create your Account</p>
                <form onSubmit={this.onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      className={
                        errors.fullName
                          ? 'form-control form-control-lg is-invalid'
                          : 'form-control form-control-lg'
                      }
                      placeholder='Name'
                      name='fullName'
                      value={this.state.fullName}
                      onChange={this.onChange}
                    />
                    {errors.fullName && (
                      <div className='invalid-feedback'>{errors.fullName}</div>
                    )}
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className={
                        errors.username
                          ? 'form-control form-control-lg is-invalid'
                          : 'form-control form-control-lg'
                      }
                      placeholder='Email Address'
                      name='username'
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                    {errors.username && (
                      <div className='invalid-feedback'>{errors.username}</div>
                    )}
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      className={
                        errors.password
                          ? 'form-control form-control-lg is-invalid'
                          : 'form-control form-control-lg'
                      }
                      placeholder='Password'
                      name='password'
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className='invalid-feedback'>{errors.password}</div>
                    )}
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      className={
                        errors.confirmPassword
                          ? 'form-control form-control-lg is-invalid'
                          : 'form-control form-control-lg'
                      }
                      placeholder='Confirm Password'
                      name='confirmPassword'
                      value={this.state.confirmPassword}
                      onChange={this.onChange}
                    />
                    {errors.confirmPassword && (
                      <div className='invalid-feedback'>
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                  <input
                    type='submit'
                    className='btn btn-info btn-block mt-4'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(mapStateToProps, { createNewUser })(Register);
