import React from "react";

import axios from "axios";

export class CustomerOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          brand: "bellona",
          stock: "1000",
          name: "Chair",
          price: 200,
          description: "Comfort",
          category: "Home",
          discount: "5",
          color: "Brown"
        }
      ],
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
        this.setState({ products: response.data });
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
          <br />
          <div className='row'>
            <strong>Status: </strong> Waiting
          </div>
        </div>
        <div className='col'>
          <div className='row justify-content-end mr-1'>
            <strong>Order ID: </strong> 1
          </div>
          <br />
          <div className='row justify-content-end mr-1'>
            <strong>Price: </strong> {element.price} $
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
