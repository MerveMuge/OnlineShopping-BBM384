import React from "react";
import axios from "axios";

export class OrderStep3 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios
      .post("http://localhost:8080/api/basket/checkout")
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div style={{ backgroundColor: "#F8F3EF" }} className='py-4 px-4'>
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
              disabled
            >
              1
            </button>
            {"Delivery Information"}
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
              disabled
            >
              2
            </button>
            {"Payment Information"}
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
              disabled
            >
              3
            </button>
            {"Order Completed"}
          </div>

          <div className='container px-5 py-3'>
            <div className='row'>
              <div
                style={{ backgroundColor: "#fff", minHeight: 425 }}
                className='col-12 mr-2 pt-2'
              >
                <img
                  style={{ width: 200, height: 200 }}
                  className='img-responsive center-block my-auto'
                  src={
                    "http://www.izmiryenicevre.com/wp-content/uploads/2015/05/Check.png"
                  }
                />

                <div
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    marginTop: "50px"
                  }}
                >
                  <h3>Your Order #00000000 has been approved.</h3>
                  <br />
                  <h3>
                    Your order has been received. Once approved by admin, your
                    transaction will be started.
                  </h3>
                  <br />
                  <h3>Thank You For Choosing Us.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
