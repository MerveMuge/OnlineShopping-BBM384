import React from "react";
import { Table, Form, Col, Row } from "react-bootstrap";
import { AddressPopup } from "./AddressPopup";

export class OrderStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }

  render() {
    return (
      <div style={{ backgroundColor: "#F8F3EF" }} className='py-4 px-4 border'>
        <div style={{ backgroundColor: "#F2EEEE" }} className='py-4 border'>
          <div className='d-flex justify-content-center'>
            <button
              className='btn btn-warning'
              style={{
                width: "30px",
                height: "30px",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                borderRadius: "15px"
              }}
              disabled
            >
              1
            </button>
            {"Delivery Information"}
            <button
              className='btn btn-danger'
              style={{
                width: "30px",
                height: "30px",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                borderRadius: "15px",
                marginLeft: "5px"
              }}
              onClick={() => {
                this.props.history.push("/order2");
              }}
            >
              2
            </button>
            {"Payment Information"}
            <button
              className='btn btn-danger'
              style={{
                width: "30px",
                height: "30px",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                borderRadius: "15px",
                marginLeft: "5px"
              }}
              onClick={() => {
                this.props.history.push("/order3");
              }}
            >
              3
            </button>
            {"Order Completed"}
          </div>

          <div className='px-5 py-3'>
            <div className='row'>
              <div
                style={{ backgroundColor: "#fff", minHeight: 500 }}
                className='col-9 mr-2 pt-2'
              >
                <h4 style={{ color: "blue" }}>Delivery Information</h4>
                <h6>Please specify your delivery address.</h6>
                <hr />
                <h4 style={{ color: "blue" }}>Address Selection</h4>
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
                <hr />
                <h4 style={{ color: "blue" }}>Products</h4>
                <Table responsive bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Image</th>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Seller Name</th>
                      <th>Product Amount</th>
                      <th>Product Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <img
                          style={{ width: 100, height: 100 }}
                          className='my-auto text-center'
                          src={
                            "https://create.adobe.com/2017/7/12/the_geometric_illustrations_of_yo_az/_jcr_content/article-body/full_width_images/image2.img.png/1499894492198.png"
                          }
                        />
                      </td>
                      <td>1234</td>
                      <td>Walter White</td>
                      <td>Breaking Bad</td>
                      <td>
                        <div
                          className='d-flex m-1 mr-4 py-1'
                          style={{ borderRadius: 7, backgroundColor: "#fff" }}
                        >
                          <div
                            className='text-center'
                            style={{
                              fontSize: 15,
                              cursor: "pointer",
                              width: 15
                            }}
                            onClick={() => {
                              var quantity = this.state.quantity - 1;
                              if (quantity >= 1) this.setState({ quantity });
                            }}
                          >
                            -
                          </div>
                          <input
                            className='text-center borderless'
                            type='text'
                            value={this.state.quantity}
                            onChange={event => {
                              var quantity = event.target.value;
                              if (quantity <= 0) quantity = 0;
                              else quantity = parseInt(quantity, 10);
                              this.setState({ quantity });
                            }}
                            style={{ width: 50 }}
                          />
                          <div
                            className='text-center'
                            style={{
                              fontSize: 15,
                              cursor: "pointer",
                              width: 15
                            }}
                            onClick={() =>
                              this.setState({
                                quantity: this.state.quantity + 1
                              })
                            }
                          >
                            +
                          </div>
                        </div>
                      </td>
                      <td>Description</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <img
                          style={{ width: 100, height: 100 }}
                          className='my-auto text-center'
                          src={
                            "https://i.pinimg.com/736x/f4/44/c2/f444c2ff0fe53e4cfdcb2a70a880e9e7.jpg"
                          }
                        />
                      </td>
                      <td>2345</td>
                      <td>Sherlock Holmes</td>
                      <td>Sherlock</td>
                      <td>
                        <div
                          className='d-flex m-1 mr-4 py-1'
                          style={{ borderRadius: 7, backgroundColor: "#fff" }}
                        >
                          <div
                            className='text-center'
                            style={{
                              fontSize: 15,
                              cursor: "pointer",
                              width: 15
                            }}
                            onClick={() => {
                              var quantity = this.state.quantity - 1;
                              if (quantity >= 1) this.setState({ quantity });
                            }}
                          >
                            -
                          </div>
                          <input
                            className='text-center borderless'
                            type='text'
                            value={this.state.quantity}
                            onChange={event => {
                              var quantity = event.target.value;
                              if (quantity <= 0) quantity = 0;
                              else quantity = parseInt(quantity, 10);
                              this.setState({ quantity });
                            }}
                            style={{ width: 50 }}
                          />
                          <div
                            className='text-center'
                            style={{
                              fontSize: 15,
                              cursor: "pointer",
                              width: 15
                            }}
                            onClick={() =>
                              this.setState({
                                quantity: this.state.quantity + 1
                              })
                            }
                          >
                            +
                          </div>
                        </div>
                      </td>
                      <td>Description</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <img
                          style={{ width: 100, height: 100 }}
                          className='my-auto text-center'
                          src={
                            "https://i.pinimg.com/originals/2a/d5/a5/2ad5a584ad130593c050056866c91e34.jpg"
                          }
                        />
                      </td>
                      <td>3456</td>
                      <td>Tony Stark</td>
                      <td>Iron Man</td>
                      <td>
                        <div
                          className='d-flex m-1 mr-4 py-1'
                          style={{ borderRadius: 7, backgroundColor: "#fff" }}
                        >
                          <div
                            className='text-center'
                            style={{
                              fontSize: 15,
                              cursor: "pointer",
                              width: 15
                            }}
                            onClick={() => {
                              var quantity = this.state.quantity - 1;
                              if (quantity >= 1) this.setState({ quantity });
                            }}
                          >
                            -
                          </div>
                          <input
                            className='text-center borderless'
                            type='text'
                            value={this.state.quantity}
                            onChange={event => {
                              var quantity = event.target.value;
                              if (quantity <= 0) quantity = 0;
                              else quantity = parseInt(quantity, 10);
                              this.setState({ quantity });
                            }}
                            style={{ width: 50 }}
                          />
                          <div
                            className='text-center'
                            style={{
                              fontSize: 15,
                              cursor: "pointer",
                              width: 15
                            }}
                            onClick={() =>
                              this.setState({
                                quantity: this.state.quantity + 1
                              })
                            }
                          >
                            +
                          </div>
                        </div>
                      </td>
                      <td>Description</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div
                style={{ backgroundColor: "#fff", maxHeight: 375 }}
                className='col-2 ml-2' // kenarlara yapışmıyor!
              >
                <div style={{ textAlign: "right" }}>
                  <h4 style={{ color: "blue" }}>Order Summary</h4>
                  <h6>XX Products</h6>
                  <button
                    className='col-12 btn btn-primary'
                    onClick={() => {
                      this.props.history.push("/order2");
                    }}
                  >
                    Continue
                  </button>
                  <hr />
                  <h6>Total Price Of Products</h6>
                  <h6 style={{ color: "gray" }}>[VAT Included.]</h6>
                  <h6>$ XXX,xx</h6>
                  <hr />
                  <h6>Shipping Fee</h6>
                  <h6>$ XX,xx</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
