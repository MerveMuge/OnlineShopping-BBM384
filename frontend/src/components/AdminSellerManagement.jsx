import React from "react";
import { Table, FormControl, Button } from "react-bootstrap";
import axios from "axios";

export class AdminSellerManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellers: []
    };
  }

  componentDidMount() {
    //this.props.routeChange('Products');
    axios
      .get("http://localhost:8080/api/s/all")
      .then(res => {
        this.setState({ sellers: res.data.content });
      })
      .catch(err => console.log(err));
  }

  render() {
    var sellers = this.state.sellers.map((seller, index) => (
      <tr key={index + 1}>
        <td>{index + 1}</td>
        <td
          style={{
            wordWrap: "break-word",
            maxWidth: "250px"
          }}
        >
          {seller.companyName}
        </td>
        <td
          style={{
            wordWrap: "break-word",
            maxWidth: "180px"
          }}
        >
          {seller.name}
        </td>
        <td>{seller.avg_rating}</td>
        <td>{seller.numOfWaitingSale}</td>
        <td>
          <Button
            style={{ minWidth: 75 }}
            variant='outline-primary text-center'
            className='col-3'
          >
            Page
          </Button>
        </td>
      </tr>
    ));
    return (
      <React.Fragment>
        <div className='container my-5'>
          <h4>Seller Management</h4>
          <br />
          <div className='col'>
            <div className='row container py-3'>
              <FormControl
                style={{ minWidth: 75 }}
                type='text'
                placeholder='Search'
                className='mr-sm-2 col-8'
              />
              <Button
                style={{ minWidth: 75 }}
                variant='outline-primary text-center'
                className='col-3'
              >
                Search
              </Button>
            </div>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company Name</th>
                  <th>Seller Surname</th>
                  <th>Rating</th>
                  <th>Number of Waiting Approval</th>
                  <th>Seller Page</th>
                </tr>
              </thead>
              <tbody>{sellers}</tbody>
            </Table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
