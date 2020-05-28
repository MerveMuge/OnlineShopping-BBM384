import React from "react";

export class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {
          sender: "Name1",
          date: "11/11/1111",
          message: "This is a sample message from Name1 to me."
        },
        {
          sender: "Name2",
          date: "12/12/1212",
          message: "This is a sample message from Name1 to me."
        },
        {
          sender: "Name3",
          date: "10/10/1010",
          message: "This is a sample message from Name1 to me."
        }
      ]
    };
  }

  render() {
    var notifications = this.state.notifications.map(notification => (
      <div className='col'>
        <div className='row pl-0 mb-3'>
          <input
            style={{ width: 20, height: 20, margin: 7 }}
            type='checkbox'
            className=' my-auto'
            //value={this.state.selectAll}
            /*onChange={event => {
          var selected = new Array(this.state.addresses.length);
          selected.fill(event.target.checked);
          this.setState({ selectAll: event.target.checked, selected });
        }}*/
          />
          <div className='col pl-0 ml-2'>{notification.sender}</div>
          <div className='col pl-0'>{notification.date}</div>
        </div>
        <hr />
      </div>
    ));
    return (
      <div className='container my-5'>
        <h4>Notifications</h4>
        <br />
        <div className='col'>
          <div className='row pl-0 mb-3'>
            <input
              style={{ width: 20, height: 20, margin: 7 }}
              type='checkbox'
              className=' my-auto'
              //value={this.state.selectAll}
              /*onChange={event => {
                var selected = new Array(this.state.addresses.length);
                selected.fill(event.target.checked);
                this.setState({ selectAll: event.target.checked, selected });
              }}*/
            />
            <div className='col pl-0 ml-0'>Select All</div>
            <div style={{ color: "#00f" }} className='float-right mr-4'>
              Remove Selected Items
            </div>
          </div>
        </div>
        <div className='col border'>
          <div
            className='row pl-0 mb-3 border'
            style={{ backgroundColor: "#dedede" }}
          >
            <div className='col-6 pl-2 ml-0'>From</div>
            <div className='col-6 pl-3'>Date</div>
          </div>
          {notifications}
        </div>
        <div className='col border mt-4'>
          <div
            className='row pl-0 mb-3 border'
            style={{ backgroundColor: "#dedede" }}
          >
            <div className='col-6 pl-2 ml-0'>Delete</div>
          </div>
          <div className='col pl-0 mb-3'>
            <div className='row pl-0 pb-5 pt-2 ml-2'>From: 12312</div>
            <div className='row pl-0 pt-2 ml-2'>123</div>
          </div>
        </div>
      </div>
    );
  }
}
