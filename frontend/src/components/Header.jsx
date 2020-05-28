import React from "react";

import { Link } from "react-router-dom";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { IoMdPerson, IoMdCart } from "react-icons/io";

export class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  renderHeaderRight() {
    if (!!this.props.user) {
      return (
        <div className='row align-items-center float-right mr-2'>
          <div
            style={{
              color: "#fff",
              position: "absolute",
              top: 0,
              right: 0,
              cursor: "pointer"
            }}
            className='mr-3'
            onClick={() => {
              this.props.logout();
              window.location.assign("/");
            }}
          >
            logout
          </div>
          <div
            className='row mr-5 align-items-center'
            style={{ cursor: "pointer" }}
          >
            <Link to='/customer' className='row'>
              <IoMdPerson className='my-auto' color={"#fff"} size={"30px"} />
              <div
                className='my-auto'
                style={{ color: "#fff", textDecoration: "none" }}
              >
                {this.props.user.email}
              </div>
            </Link>
          </div>
          {this.props.cart ? (
            <Link to='/cart'>
              <button
                type='button'
                className='row align-items-center mt-2'
                style={{
                  backgroundColor: "#F16530",
                  borderColor: "#F16530"
                }}
              >
                <IoMdCart className='my-auto' size={"20px"} />
                <h4>Cart</h4>
              </button>
            </Link>
          ) : null}
        </div>
      );
    } else {
      return (
        <div
          style={{
            backgroundColor: "#384E6E",
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5
          }}
          className='row float-right'
        >
          <div className='col-sm align-items-center my-auto'>
            <IoMdPerson color={"#fff"} size={"30px"} />
          </div>
          <div
            className='col-sm d:block text-center'
            style={{ marginRight: " 10px" }}
          >
            <Link
              style={{
                color: "#fff",
                textDecoration: "none"
              }}
              className='row border-bottom bd-highlight'
              to='/login'
            >
              login
            </Link>
            <Link
              style={{ color: "#fff", textDecoration: "none" }}
              className='row bd-highlight'
              to='/register/customer'
            >
              register
            </Link>
          </div>
        </div>
      );
    }
  }

  render() {
    if (this.props.isHeader)
      return (
        <React.Fragment>
          <div
            className='d-flex justify-content-end'
            style={{ backgroundColor: "#384E6E" }}
          >
            <a style={{ color: "#fff", marginRight: "25px" }} href='/login'>
              Contact us
            </a>
          </div>
          <Navbar style={{ backgroundColor: "#182B49" }} variant='dark'>
            <Navbar.Brand style={{ fontSize: 45 }} className='mr-auto'>
              <Link style={{ color: "#fff", textDecoration: "none" }} to='/'>
                HUMBO
              </Link>
            </Navbar.Brand>
            <Form
              style={{
                width: "40%"
              }}
              inline
              className='mr-auto row'
            >
              <FormControl
                style={{ minWidth: 75 }}
                type='text'
                placeholder='Search'
                className='mr-sm-2 col-8'
              />
              <Button
                style={{ minWidth: 75 }}
                variant='outline-light text-center'
                className='col-3'
              >
                Search
              </Button>
            </Form>
            {this.renderHeaderRight()}
          </Navbar>
          <Nav
            style={{ backgroundColor: "#384E6E", width: "100%" }}
            className='d-flex justify-content-around'
          >
            <Link
              style={{ color: "#fff" }}
              className='bd-highlight'
              to='/products/TV'
            >
              TV
            </Link>
            <Link
              style={{ color: "#fff" }}
              className='bd-highlight'
              to='/products/Electronic'
            >
              Electronics
            </Link>
            <Link
              style={{ color: "#fff" }}
              className='bd-highlight'
              to='/products/Home'
            >
              Home
            </Link>
            <Link
              style={{ color: "#fff" }}
              className='bd-highlight'
              to='/products/Furniture'
            >
              Furniture
            </Link>
          </Nav>
          <div
            style={{ backgroundColor: "#fff", width: "100%" }}
            className='row mx-0'
          >
            <div className='col text-center'>
              Free Shipping, in order min $ 300
            </div>
            <div className='col text-center'>7/24 Support</div>
          </div>
        </React.Fragment>
      );
    return null;
  }
}
