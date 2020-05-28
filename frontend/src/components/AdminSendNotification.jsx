import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

export class AdminSendNotification extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container my-5'>
        <h4>Send Notification</h4>
        <br />
        <div className='col'>
          <div className='row container'>
            <label>To:</label>
            <FormControl
              style={{ minWidth: 100 }}
              type='text'
              placeholder='To'
              className='mr-sm-2 col-12 mb-3'
            />
          </div>

          <div className='row container mt-2'>
            <label>
              <input
                style={{ width: 20, height: 20, margin: 7 }}
                type='checkbox'
                /*checked={this.state.selected[index] == true ? true : false}
              onChange={event => {
              var selected = [...this.state.selected];
              selected[index] = event.target.checked;
              this.setState({ selected });
            }}*/
                className=' my-2'
              />
              Send notification to all customers.
            </label>
          </div>
          <div className='row container'>
            <label>
              <input
                style={{ width: 20, height: 20, margin: 7 }}
                type='checkbox'
                /*checked={this.state.selected[index] == true ? true : false}
              onChange={event => {
              var selected = [...this.state.selected];
              selected[index] = event.target.checked;
              this.setState({ selected });
            }}*/
                className=' my-auto'
              />
              Send notification to all sellers.
            </label>
          </div>
          <div className='row container mb-2'>
            <label>
              <input
                style={{ width: 20, height: 20, margin: 7 }}
                type='checkbox'
                /*checked={this.state.selected[index] == true ? true : false}
              onChange={event => {
              var selected = [...this.state.selected];
              selected[index] = event.target.checked;
              this.setState({ selected });
            }}*/
                className=' my-auto'
              />
              Send notification to all users.
            </label>
          </div>
          <div className='row container'>
            <label>Message:</label>
            <FormControl
              as='textarea'
              rows='10'
              style={{ minWidth: 100 }}
              type='text'
              placeholder='Message'
            />
          </div>
        </div>
      </div>
    );
  }
}
