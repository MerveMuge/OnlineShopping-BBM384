import React from 'react';

export class AdminAccount extends React.Component {
  render() {
    return (
      <div className='container my-5'>
        <h4>Admin Account</h4>
        <br />
        <div className='col'>
          <div className='row border container py-3'>
            <div className='col'>
              <strong className='row'>Password:</strong>
              ********
            </div>
            <button
              className='col-2 btn btn-primary float-right my-auto'
              type='button'
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
