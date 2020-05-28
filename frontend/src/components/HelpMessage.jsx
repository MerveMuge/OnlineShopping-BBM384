import React from 'react';

import axios from 'axios';

export class HelpMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };

    this.submit = this.submit.bind(this);
  }

  submit() {
    axios
      .post('http://localhost:8080/api/help/create', {
        message: this.state.input
      })
      .then(response => {
        this.setState({ input: '' });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='container my-5'>
        <h4>Help</h4>
        <br />
        <textarea
          style={{ height: 400 }}
          className='w-100 text-left'
          onChange={input => {
            this.setState({ input: input.target.value });
          }}
          value={this.state.input}
          placeholder={'Write your message here...'}
        />
        <button
          className='btn btn-primary px-3 py-2 mt-3'
          onClick={this.submit}
        >
          Send
        </button>
      </div>
    );
  }
}
