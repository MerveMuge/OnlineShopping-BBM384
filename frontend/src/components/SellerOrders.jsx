import React from "react";

import Form from "react-bootstrap/Form";
import axios from "axios";

export class SellerOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selected: [],
      mProduct: {},
      loading: true
    };
  }

  componentDidMount() {
    this.initApp();
  }

  async initApp() {
    axios
      .get("http://localhost:8080/api/s/products")
      .then(response => {
        this.setState({ products: response.data.content });
      })
      .catch(err => console.log(err));
    this.setState({ loading: false });
  }

  render() {
    var products = this.state.products.map((element, index) => (
      <div key={index} className='row border'>
        <img
          style={{ width: 100, height: 100 }}
          className='my-auto border text-center'
          src={
            !!element.picture
              ? "http://localhost:8080/files/" + element.picture
              : ""
          }
        />
        <div className='col ml-2'>
          <div className='row'>
            <strong>Name: </strong> {element.name}
          </div>
          <div className='row'>
            <strong>Stock: </strong> {element.stock}
          </div>
          <div className='row'>
            <Form.Label>
              <strong>Status</strong>
            </Form.Label>
            <Form.Control as='select' name='status'>
              <option value='Waiting'>Waiting</option>
              <option value='Getting Prepared'>Getting Prepared</option>
              <option value='On the Way'>On the Way</option>
            </Form.Control>
          </div>
        </div>
        <div className='col'>
          <div className='row justify-content-end mr-1'>
            <strong>Order ID: </strong>1
          </div>
          <div className='row justify-content-end mr-1'>
            <strong>Customer ID: </strong>u
          </div>
          <div className='row justify-content-end mr-1'>
            <strong>Price: </strong> {element.price}
          </div>
        </div>
      </div>
    ));
    if (this.state.loading) return <div>loading...</div>;
    return (
      <div className='container my-5'>
        <h4>Orders</h4>
        <br />
        <div className='col'>{products}</div>
      </div>
    );
  }
}
