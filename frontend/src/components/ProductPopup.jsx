import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';

export class ProductPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '' };
  }

  componentWillReceiveProps(props) {
    if (!!props.product) {
      if (!!props.product.picture)
        this.setState({
          imagePreviewUrl:
            'http://localhost:8080/files/' + props.product.picture
        });
      else this.setState({ imagePreviewUrl: '' });
    }
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            {this.props.mtitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={values => {
              if (this.props.mtitle.includes('Edit'))
                this.props.submitEdit(values);
              else this.props.submitNew(values);
            }}
            validate={values => {
              let errors = {};
              if (!values.name) {
                errors.name = 'Required';
              }
              if (!values.brand) {
                errors.brand = 'Required';
              }
              if (!values.color) {
                errors.color = 'Required';
              }
              if (!values.stock) {
                errors.stock = 'Required';
              } else if (!(values.stock > 0)) {
                errors.stock = 'Must be greater than 0';
              }
              if (!values.price) {
                errors.price = 'Required';
              } else if (!(values.price > 0)) {
                errors.price = 'Must be grater than 0';
              }
              if (!values.discount) {
                errors.discount = 'Required';
              } else if (values.discount < 0) {
                errors.discount = "Can't be negative";
              } else if (values.discount > 100) {
                errors.discount = 'Must be lesser than 100';
              }
              return errors;
            }}
            initialValues={{
              name: this.props.product.name,
              category: this.props.product.category,
              brand: this.props.product.brand,
              stock: this.props.product.stock,
              price: this.props.product.price,
              discount: this.props.product.discount,
              color: this.props.product.color,
              description: this.props.product.description,
              file: null
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              setFieldValue
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <div>
                    <img
                      style={{ width: 250, height: 250 }}
                      className='border mr-3 mb-3'
                      src={
                        this.state.imagePreviewUrl !== ''
                          ? this.state.imagePreviewUrl
                          : ''
                      }
                    />
                    <input
                      style={{ width: 250 }}
                      id='file'
                      name='file'
                      type='file'
                      onChange={event => {
                        let reader = new FileReader();
                        let file = event.currentTarget.files[0];
                        reader.onloadend = () => {
                          setFieldValue('file', file);
                          this.setState({ imagePreviewUrl: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }}
                      className='form-control'
                    />
                  </div>
                  <Col>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type='text'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={touched.name && !!errors.name}
                      />
                      <Form.Control.Feedback
                        type='invalid'
                        className='text-center'
                      >
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          as='select'
                          name='category'
                          value={values.category}
                          onChange={handleChange}
                        >
                          <option value='TV'>TV</option>
                          <option value='Mobile Phones'>Mobile Phones</option>
                          <option value='Home'>Home</option>
                          <option value='Smart Phones'>Smart Phones</option>
                          <option value='Furniture'>Furniture</option>
                          <option value='Electronic'>Electronic</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                          type='text'
                          name='brand'
                          value={values.brand}
                          onChange={handleChange}
                          isInvalid={touched.brand && !!errors.brand}
                        />
                        <Form.Control.Feedback
                          type='invalid'
                          className='text-center'
                        >
                          {errors.brand}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} xs='3'>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type='text'
                      name='stock'
                      value={values.stock}
                      onChange={handleChange}
                      isInvalid={touched.stock && !!errors.stock}
                    />
                    <Form.Control.Feedback
                      type='invalid'
                      className='text-center'
                    >
                      {errors.stock}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs='3'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type='text'
                      name='price'
                      value={values.price}
                      onChange={handleChange}
                      isInvalid={touched.price && !!errors.price}
                    />
                    <Form.Control.Feedback
                      type='invalid'
                      className='text-center'
                    >
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs='3'>
                    <Form.Label>Discount(%)</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='discount'
                      name='discount'
                      value={values.discount}
                      onChange={handleChange}
                      isInvalid={touched.discount && !!errors.discount}
                    />
                    <Form.Control.Feedback
                      type='invalid'
                      className='text-center'
                    >
                      {errors.discount}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md='3'>
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                      as='select'
                      placeholder='color'
                      name='color'
                      value={values.color}
                      onChange={handleChange}
                      isInvalid={touched.color && !!errors.color}
                    >
                      <option>red</option>
                      <option>blue</option>
                      <option>green</option>
                      <option>yellow</option>
                      <option>black</option>
                      <option>brown</option>
                      <option>cyan</option>
                      <option>fuchsia</option>
                      <option>yellow</option>
                      <option>grey</option>
                      <option>silver</option>
                      <option>lime</option>
                      <option>orange</option>
                      <option>pink</option>
                    </Form.Control>

                    <Form.Control.Feedback
                      type='invalid'
                      className='text-center'
                    >
                      {errors.color}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as='textarea'
                      placeholder='Description'
                      name='description'
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description}
                    />

                    <Form.Control.Feedback type='invalid'>
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <div className='row mx-3'>
                  <Button type='submit'>Save</Button>
                  <div className='col'>
                    <Button className='float-right' onClick={this.props.onHide}>
                      Close
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  }
}
