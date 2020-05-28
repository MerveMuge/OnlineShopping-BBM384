import React from "react";

import {
  FaRegCreditCard,
  FaCcMastercard,
  FaCreditCard,
  FaCcVisa,
  FaPaypal,
  FaAmazonPay
} from "react-icons/fa";
import {
  MdLaptopChromebook,
  MdTv,
  MdPhoneAndroid,
  MdSmartphone,
  MdEmail,
  MdBook,
  MdHome
} from "react-icons/md";
export class Footer extends React.Component {
  render() {
    if (this.props.isFooter)
      return (
        <React.Fragment>
          <div className='footer sticky-bottom'>
            <div
              style={{ backgroundColor: "#384E6E", width: "100%" }}
              className='d-flex justify-content-around'
            >
              <div
                style={{ color: "#fff" }}
                className='d-flex flex-column bd-highlight mb-3 mt-auto'
                href='/'
              >
                <a
                  style={{ color: "#999999", fontSize: "20px" }}
                  className='p-1 bd-highlight'
                >
                  HUMBO
                </a>
                <a
                  style={{ color: "white" }}
                  className='p-1 bd-highlight'
                  href='/aboutUs'
                >
                  About Us
                </a>
                <a
                  style={{ color: "white" }}
                  className='p-1 bd-highlight'
                  href='/contactUs'
                >
                  Contact US
                  <MdEmail
                    style={{ marginLeft: 10 }}
                    className='my-auto'
                    color={"#fff"}
                    size={"15px"}
                  />
                </a>
                <a
                  style={{ color: "white" }}
                  className='p-1 bd-highlight'
                  href='/ourPolicy'
                >
                  Our Policy
                </a>
                <a
                  style={{ color: "white" }}
                  className='p-1 bd-highlight'
                  href='/seller'
                >
                  My Account
                </a>
                <a style={{ marginTop: 15 }}>
                  <FaCcMastercard
                    style={{ marginLeft: 10 }}
                    className='my-auto'
                    color={"#fff"}
                    size={"25px"}
                  />
                  <FaCreditCard
                    style={{ marginLeft: 10 }}
                    className='my-auto'
                    color={"#fff"}
                    size={"25px"}
                  />
                  <FaCcVisa
                    style={{ marginLeft: 10 }}
                    className='my-auto'
                    color={"#fff"}
                    size={"25px"}
                  />
                  <FaPaypal
                    style={{ marginLeft: 10 }}
                    className='my-auto'
                    color={"#fff"}
                    size={"25px"}
                  />
                  <FaAmazonPay
                    style={{ marginLeft: 10 }}
                    className='my-auto'
                    color={"#fff"}
                    size={"25px"}
                  />
                </a>
              </div>
              <div
                style={{ color: "#fff" }}
                className='d-flex flex-column bd-highlight mb-3'
                href='/'
              >
                <a
                  style={{ color: "#999999", fontSize: "20px" }}
                  className='p-1 bd-highlight'
                >
                  CATEGORIES
                </a>
                <a
                  style={{ color: "white" }}
                  className='p-1 bd-highlight'
                  href='/products'
                >
                  Laptop
                  <MdLaptopChromebook
                    style={{ marginLeft: 10 }}
                    className='my-auto'
                    color={"#fff"}
                    size={"15px"}
                  />
                </a>
                <a
                  style={{ color: "white" }}
                  className='p-1 bd-highlight'
                  href='/products/TV'
                >
                  TV
                  <MdTv
                    style={{ marginLeft: 10 }}
                    className='my-auto'
                    color={"#fff"}
                    size={"15px"}
                  />
                </a>
                <a
                  style={{ color: "white" }}
                  className='p-1 bd-highlight'
                  href='/products/Smart%20Phones'
                >
                  Smart Phone
                  <MdPhoneAndroid
                    style={{ marginLeft: 10 }}
                    className='my-auto'
                    color={"#fff"}
                    size={"15px"}
                  />
                </a>
                <a
                  style={{ color: "white" }}
                  className='p-1 bd-highlight'
                  href='/products/Mobile%20Phones'
                >
                  Cell Phone
                  <MdSmartphone
                    style={{ marginLeft: 10 }}
                    className='my-auto'
                    color={"#fff"}
                    size={"15px"}
                  />
                </a>
                <a
                  style={{ color: "white" }}
                  className='p-1 bd-highlight'
                  href='/products/Home'
                >
                  Home
                  <MdHome
                    style={{ marginLeft: 10 }}
                    className='my-auto'
                    color={"#fff"}
                    size={"15px"}
                  />
                </a>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    return null;
  }
}
