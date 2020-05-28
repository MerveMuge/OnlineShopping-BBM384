import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {
  CountryDropdown,
  CountryRegionData,
  RegionDropdown
} from 'react-country-region-selector';
import { Formik } from 'formik';

export class AddressPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { country: '', region: '' };

    this.modalWillMount = this.modalWillMount.bind(this);
  }

  countryChange(val) {
    this.setState({ country: val });
  }

  regionChange(val) {
    this.setState({ region: val });
  }

  modalWillMount() {
    this.setState({
      country: this.props.address.country,
      region: this.props.address.region
    });
  }

  render() {
    return (
      <Modal
        onEnter={this.modalWillMount}
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
              if (!values.address) {
                errors.address = 'Required';
              }
              if (!values.country) {
                errors.country = 'Required';
              }
              if (!values.region) {
                errors.region = 'Required';
              }

              return errors;
            }}
            initialValues={{
              name: this.props.address.name,
              address: this.props.address.address,
              country: this.props.address.country,
              region: this.props.address.region
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
              setFieldValue,
              dirty
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group>
                    <Form.Label>Address Name</Form.Label>
                    <Form.Control
                      type='text'
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <CountryDropdown
                      name='country'
                      value={values.country}
                      onChange={e => setFieldValue('country', e)}
                      className='form-control'
                    />
                    <div style={{ color: '#DC4145' }}>{errors.country}</div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Region</Form.Label>
                    <RegionDropdown
                      country={values.country}
                      name='region'
                      value={values.region}
                      onChange={e => setFieldValue('region', e)}
                      className='form-control'
                    />
                    <div style={{ color: '#DC4145' }}>{errors.region}</div>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as='textarea'
                      placeholder='Description'
                      name='address'
                      value={values.address}
                      onChange={handleChange}
                      isInvalid={!!errors.address}
                    />

                    <Form.Control.Feedback type='invalid'>
                      {errors.address}
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
