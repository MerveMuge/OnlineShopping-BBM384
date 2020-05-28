import React from "react";
import { Table, FormControl, Button } from "react-bootstrap";
import axios from "axios";

export class AdminProductManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    //this.props.routeChange('Products');
    axios
      .get("http://localhost:8080/api/products")
      .then(res => {
        this.setState({ products: res.data.content });
      })
      .catch(err => console.log(err));
  }

  render() {
    var products = this.state.products.map((product, index) => (
      <tr key={index + 1}>
        <td>{index + 1}</td>
        <td>{product.id}</td>
        <td
          style={{
            wordWrap: "break-word",
            maxWidth: "280px"
          }}
        >
          {product.category.name}
        </td>
        <td>{product.name}</td>
        <td>{product.stock}</td>
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
          <h4>Product Management</h4>
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
                  <th>Product ID</th>
                  <th>Category</th>
                  <th>Product Name</th>
                  <th>Stock Status</th>
                  <th>Product Page</th>
                </tr>
              </thead>
              <tbody>{products}</tbody>
            </Table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
