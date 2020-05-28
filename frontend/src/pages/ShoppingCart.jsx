import React from 'react';
import { Table, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';

export class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], totalPrice: 0.0, orderStep: 0 };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8080/api/basket')
      .then(res => {
        this.setState({ orders: res.data.orders });
        this.calculateTotalPrice(res.data.orders);
      })
      .catch(err => console.log(err));
  }

  calculateTotalPrice(orders) {
    var totalPrice = 0.0;
    orders.forEach(element => {
      totalPrice +=
        element.product.price *
        (1 - element.product.discount / 100) *
        element.quantity;
    });
    this.setState({ totalPrice: totalPrice.toFixed(2) });
  }

  renderSteps() {
    var orders = this.state.orders.map((order, index) => (
      <tr key={order.id}>
        <td>{index + 1}</td>
        <td>{order.product.id}</td>
        <td>{order.product.color}</td>
        <td>{order.product.name}</td>
        <td>{order.product.seller.name}</td>
        <td>{order.quantity}</td>
        <td>
          $
          {order.product.price *
            (1 - order.product.discount / 100) *
            order.quantity}
        </td>
        {this.state.orderStep == 0 ? (
          <td>
            <button
              className='btn btn-danger'
              onClick={() => {
                axios
                  .delete(
                    'http://localhost:8080/api/basket?orderId=' + order.id
                  )
                  .then(res => {
                    var orders = this.state.orders;
                    orders.splice(
                      orders.findIndex(target => target.id == order.id),
                      1
                    );
                    this.calculateTotalPrice(orders);
                    this.setState({ orders });
                  });
              }}
            >
              Delete
            </button>
          </td>
        ) : null}
      </tr>
    ));
    switch (this.state.orderStep) {
      case 0:
        return (
          <div>
            <h4 style={{ color: 'blue' }}>Your Cart</h4>
            <hr />
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product ID</th>
                  <th>Product color</th>
                  <th>Product Name</th>
                  <th>Seller Name</th>
                  <th>Product Amount</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>{orders}</tbody>
            </Table>
          </div>
        );

      case 1:
        return (
          <div>
            <h4 style={{ color: 'blue' }}>Delivery Information</h4>
            <h6>Please specify your delivery address.</h6>
            <hr />
            <h4 style={{ color: 'blue' }}>Address Selection</h4>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th />
                  <th>Address Name</th>
                  <th>Address Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Form>
                      <Form.Group controlId='formBasicChecbox'>
                        <Form.Check type='checkbox' />
                      </Form.Group>
                    </Form>
                  </td>
                  <td>Ev</td>
                  <td>Kazım Orbay Mah., 339.Sokak, Mamak</td>
                </tr>
                <tr>
                  <td>
                    <Form>
                      <Form.Group controlId='formBasicChecbox'>
                        <Form.Check type='checkbox' />
                      </Form.Group>
                    </Form>
                  </td>
                  <td>İş</td>
                  <td>Kazım Karabekir Cad., 39.Sokak, Abidinpaşa</td>
                </tr>
              </tbody>
            </Table>
            <button className='btn btn-primary' type='button'>
              Add New Address
            </button>
            <br />
            <br />
            <br />
            <hr />
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product ID</th>
                  <th>Product color</th>
                  <th>Product Name</th>
                  <th>Seller Name</th>
                  <th>Product Amount</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>{orders}</tbody>
            </Table>
          </div>
        );

      case 2:
      case 3:
        return (
          <div>
            <h4 style={{ color: 'blue' }}>Payment Information</h4>
            <hr />
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm='2'>
                  Card Number
                </Form.Label>
                <Col sm='10'>
                  <Form.Control type='text' placeholder='0123 4567 8901 2345' />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm='2'>
                  Name On Card
                </Form.Label>
                <Col sm='10'>
                  <Form.Control type='text' />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm='2'>
                  Expiry Date
                </Form.Label>
                <Col>
                  <Form.Control type='text' placeholder='MM' />
                </Col>
                <Col>
                  <Form.Control type='text' placeholder='YYYY' />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm='2'>
                  CVV Code
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='text'
                    placeholder='3-digit number on the back of the card'
                  />
                </Col>
              </Form.Group>
            </Form>
          </div>
        );

      default:
        return null;
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: '#F8F3EF' }} className='py-4 px-4 border'>
        <div style={{ backgroundColor: '#F2EEEE' }} className='py-4 border'>
          <div className='px-5 py-3'>
            <div className='row'>
              <div
                style={{ backgroundColor: '#fff', minHeight: 500 }}
                className='col-9 mr-2 pt-2'
              >
                {this.renderSteps()}
              </div>
              <div
                style={{ backgroundColor: '#fff', maxHeight: 275 }}
                className='col ml-2' // kenarlara yapışmıyor!
              >
                <div style={{ textAlign: 'right' }}>
                  <h4 style={{ color: 'blue' }}>Order Summary</h4>
                  <h6>{this.state.orders.length} Orders</h6>
                  <button
                    className='col-12 btn btn-primary'
                    onClick={() => {
                      var orderStep = this.state.orderStep;
                      orderStep += 1;
                      this.setState({ orderStep });
                      if (orderStep == 3) this.props.history.push('/order3');
                    }}
                  >
                    Continue
                  </button>
                  <hr />
                  <h6>Total Price Of Products</h6>
                  <h6 style={{ color: 'gray' }}>[VAT Included.]</h6>
                  <h6>$ {this.state.totalPrice}</h6>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}