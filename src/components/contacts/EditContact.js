import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const { name, email, phone } = res.data;

    this.setState({ name, email, phone });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    // Check for error
    if (name === '')
      return this.setState({ errors: { name: 'Name is required' } });

    if (email === '')
      return this.setState({ errors: { email: 'Email is required' } });

    if (phone === '')
      return this.setState({ errors: { phone: 'Phone is required' } });

    const { id } = this.props.match.params;

    const contact = {
      name,
      email,
      phone
    };

    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        contact
      );

      dispatch({ type: 'UPDATE_CONTACT', payload: res.data });
    } catch (error) {}

    // Clear state -> clear form
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    // Redirect to Contact List
    this.props.history.push('/');
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div>
              <div className="card mb-3">
                <div className="card-header">Edit Contact</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                    <TextInputGroup
                      label="Name"
                      name="name"
                      placeholder="Enter Name..."
                      value={name}
                      onChange={this.onChange}
                      error={errors.name}
                    />
                    <TextInputGroup
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Enter Email..."
                      value={email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                    <TextInputGroup
                      label="Phone"
                      name="phone"
                      placeholder="Enter Phone..."
                      value={phone}
                      onChange={this.onChange}
                      error={errors.phone}
                    />
                    <input
                      type="submit"
                      value="Update ontact"
                      className="btn btn-block btn-light"
                    />
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
