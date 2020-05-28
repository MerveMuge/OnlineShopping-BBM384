import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export class OrderStep2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ backgroundColor: "#F8F3EF" }} className='py-4 px-4 border'>
        <div style={{ backgroundColor: "#F2EEEE" }} className='py-4 border'>
          <div className='d-flex justify-content-center'>
            <button
              className='btn btn-success'
              style={{
                width: "30px",
                height: "30px",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                borderRadius: "15px"
              }}
              onClick={() => {
                this.props.history.push("/order1");
              }}
            >
              1
            </button>
            {"Delivery Information"}
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
                borderRadius: "15px"
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
                style={{ backgroundColor: "#fff", minHeight: 425 }}
                className='col-9 mr-2 pt-2'
              >
                <h4 style={{ color: "blue" }}>Payment Information</h4>
                <hr />
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm='2'>
                      Card Number
                    </Form.Label>
                    <Col sm='10'>
                      <Form.Control
                        type='text'
                        placeholder='0123 4567 8901 2345'
                      />
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
                      this.props.history.push("/order3");
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
