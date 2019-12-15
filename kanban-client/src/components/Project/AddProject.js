import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from '../../actions/projectActions';

class AddProject extends Component {
  constructor() {
    super();

    this.state = {
      projectName: '',
      projectIdentifier: '',
      description: '',
      start_date: '',
      end_date: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    };

    this.props.createProject(newProject, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className='project'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h5 className='display-4 text-center'>Create Project form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    className={
                      errors.projectName
                        ? 'form-control form-control-lg is-invalid'
                        : 'form-control form-control-lg'
                    }
                    placeholder='Project Name'
                    name='projectName'
                    value={this.state.projectName}
                    onChange={this.onChange}
                  />
                  {errors.projectName && (
                    <div className='invalid-feedback'>{errors.projectName}</div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className={
                      errors.projectIdentifier
                        ? 'form-control form-control-lg is-invalid'
                        : 'form-control form-control-lg'
                    }
                    placeholder='Unique Project ID'
                    name='projectIdentifier'
                    value={this.state.projectIdentifier}
                    onChange={this.onChange}
                  />
                  {errors.projectIdentifier && (
                    <div className='invalid-feedback'>
                      {errors.projectIdentifier}
                    </div>
                  )}
                </div>

                <div className='form-group'>
                  <textarea
                    className={
                      errors.description
                        ? 'form-control form-control-lg is-invalid'
                        : 'form-control form-control-lg'
                    }
                    placeholder='Project Description'
                    name='description'
                    value={this.state.description}
                    onChange={this.onChange}
                  ></textarea>
                  {errors.description && (
                    <div className='invalid-feedback'>{errors.description}</div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className='form-group'>
                  <input
                    type='date'
                    className='form-control form-control-lg'
                    name='start_date'
                    value={this.state.start_date}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className='form-group'>
                  <input
                    type='date'
                    className='form-control form-control-lg'
                    name='end_date'
                    value={this.state.end_date}
                    onChange={this.onChange}
                  />
                </div>

                <input
                  type='submit'
                  className='btn btn-primary btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ errors: state.errors });

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { createProject })(AddProject);

// alternative
// static getDerivedStateFromProps(nextProps, prevState) {
//   if (nextProps.errors !== prevState.errors) {
//     return { errors: nextProps.errors };
//   } else return null;
// }

// componentDidUpdate(prevProps, nextProps) {
//   if (prevProps.errors !== this.props.errors && nextProps.errors) {
//     this.setState({ errors: nextProps.errors });
//   }
// }
