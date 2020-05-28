import React from "react";
import { Table, Form, Col, Button } from "react-bootstrap";
import axios from "axios";

export class AdminPromotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotions: [
        {
          category: "TV",
          valid_date: "11.11.1111",
          valid_time: "11:11",
          promotion_slogan:
            "discountdiscount discountdiscount discountdiscountdiscountdiscountdiscountdiscountdiscountdiscountdiscount",
          id: 1
          //promotion_picture: ""
        },
        {
          category: "TV",
          valid_date: "11.11.1111",
          valid_time: "11:11",
          promotion_slogan:
            "discountdiscount discountdiscount discountasdasdasdasdasdsasdasasdasdasdasdasdsa",
          id: 2
          //promotion_picture: ""
        },
        {
          category: "TV",
          valid_date: "11.11.1111",
          valid_time: "11:11",
          promotion_slogan:
            "discountdiscount discountdiscount discountasdasdasdassdfsdd",
          id: 3
          //promotion_picture: ""
        }
      ]
    };
  }

  componentDidMount() {
    //this.props.routeChange('Products');
    axios
      .get("http://localhost:8080/api/promotion")
      .then(res => {
        //this.setState({ products: res.data.content });
      })
      .catch(err => console.log(err));
  }

  render() {
    var promotions = this.state.promotions.map(promotion => (
      <tr key={promotion.id}>
        <td>
          <input
            style={{ width: 20, height: 20, margin: 0 }}
            type='checkbox'
            className=' my-auto mr-2'
            /*value={this.state.selectAll}
          onChange={event => {
            var selected = new Array(this.state.addresses.length);
            selected.fill(event.target.checked);
            this.setState({ selectAll: event.target.checked, selected });
          }}*/
          />
          {promotion.category}
        </td>
        <td
          style={{
            wordWrap: "break-word",
            maxWidth: "400px"
          }}
        >
          {promotion.promotion_slogan}
        </td>
        <td>{promotion.valid_date}</td>
        <td>
          <Button
            style={{ minWidth: 75 }}
            variant='outline-primary text-center'
            className='col-3 float-right'
          >
            Edit
          </Button>
        </td>
      </tr>
    ));
    return (
      <div className='container my-5'>
        <h4>Add Promotion</h4>
        <div className='container border bg-light mb-5'>
          <Form.Row>
            <Form.Group as={Col} className='mr-5'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                name='category'
                className=''
                //value={values.name}
                //onChange={handleChange}
                //isInvalid={touched.name && !!errors.name}
              />
            </Form.Group>
            <Form.Group as={Col} className='ml-5'>
              <Form.Label>Valid Date</Form.Label>
              <Form.Control
                type='text'
                name='date'
                className='px-auto'
                //value={values.name}
                //onChange={handleChange}
                //isInvalid={touched.name && !!errors.name}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Valid Time</Form.Label>
              <Form.Control
                type='text'
                name='time'
                className='px-auto'
                //value={values.name}
                //onChange={handleChange}
                //isInvalid={touched.name && !!errors.name}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} className='mr-5'>
              <Form.Label>Promotion Slogan</Form.Label>
              <Form.Control
                type='text'
                name='slogan'
                className='px-auto'
                as='textarea'
                rows='6'
                //value={values.name}
                //onChange={handleChange}
                //isInvalid={touched.name && !!errors.name}
              />
            </Form.Group>
            <div className='col-6 mr-5'>
              <div className='row mb-1'>Promotion Picutre</div>
              <div className='row'>
                <img
                  style={{ width: 170, height: 170 }}
                  className='border mr-3 mb-2 bg-white'
                  /*src={
                  this.state.imagePreviewUrl ? this.state.imagePreviewUrl : ''
                }*/
                />
                <div className='row ml-0 mb-1'>
                  <input
                    style={{ width: 250 }}
                    id='file'
                    name='file'
                    type='file'
                    onChange={event => {
                      let reader = new FileReader();
                      let file = event.currentTarget.files[0];
                      reader.onloadend = () => {
                        setFieldValue("file", file);
                        this.setState({ imagePreviewUrl: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }}
                    className='form-control'
                  />
                </div>
              </div>
            </div>
          </Form.Row>
        </div>
        <div className='row ml-2 mt-5'>Advertisement Type</div>
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
              className=' my-2'
            />
            Send notification to all users.
          </label>
        </div>
        <button
          className='btn btn-primary float-right mt-3 px-5'
          //onClick={this.addProduct}
        >
          <h5>Add</h5>
        </button>
        <br />
        <br />
        <hr />
        <div className='container'>
          <h4>List of All Promotions</h4>
          <div className='col'>
            <div className='row pl-0 mb-3'>
              <input
                style={{ width: 20, height: 20, margin: 7 }}
                type='checkbox'
                className=' my-auto ml-2'
                /*value={this.state.selectAll}
              onChange={event => {
                var selected = new Array(this.state.addresses.length);
                selected.fill(event.target.checked);
                this.setState({ selectAll: event.target.checked, selected });
              }}*/
              />
              <div className='col pl-0 ml-0'>Select All</div>
              <div style={{ color: "#00f" }} className='float-right mr-0'>
                Remove Selected Items
              </div>

              <Table responsive bordered hover>
                <tbody>{promotions}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
