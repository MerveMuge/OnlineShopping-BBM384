import React from "react";

import { FaPencilAlt, FaCheck } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Authentication from "../helpers/Authentication";

const API_URL = "http://localhost:8080/";

export class AccountInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      date: "",
      password: "*********",
      errName: "",
      errEmail: "",
      errPhone: "",
      errDate: "",
      errPassword: ""
    };

    this.validateName = this.validateName.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.validateDate = this.validateDate.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  componentDidMount() {
    const { seller, customer } = this.props;
    var user = !!customer ? customer : seller;
    if (!!user && !!user.email) {
      this.setState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        date: user.birthdate
      });
    }
  }

  componentWillReceiveProps(props) {
    const { seller, customer } = props;
    var user = !!customer ? customer : seller;
    if (!!user && !!user.email) {
      this.setState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        date: user.birthdate
      });
    }
  }

  render() {
    return (
      <div className='container my-5'>
        <h4>Your Account</h4>
        <br />
        <div className='col'>
          <div className='row border pl-3'>
            <div className='col my-2'>
              <strong className='row'>Name:</strong>
              <Form.Control
                plaintext={!this.state.editName}
                readOnly={!this.state.editName}
                value={this.state.name ? this.state.name : ""}
                onChange={e => this.setState({ name: e.target.value })}
                isInvalid={!!this.state.errName}
              />
              <Form.Control.Feedback type='invalid'>
                {this.state.errName}
              </Form.Control.Feedback>
            </div>
            {this.state.editName ? (
              <FaCheck
                style={{
                  backgroundColor: "#3b3",
                  borderBottomLeftRadius: 8,
                  padding: 5,
                  cursor: "pointer"
                }}
                size={"35px"}
                onClick={async () => {
                  if (await this.validateName())
                    this.setState({ editName: false });
                }}
              />
            ) : (
              <FaPencilAlt
                style={{
                  backgroundColor: "#bbb",
                  borderBottomLeftRadius: 8,
                  padding: 5,
                  cursor: "pointer"
                }}
                size={"35px"}
                onClick={() => this.setState({ editName: true })}
              />
            )}
          </div>
          <div className='row border pl-3'>
            <div className='col my-2'>
              <strong className='row'>Email:</strong>
              <Form.Control
                plaintext={!this.state.editEmail}
                readOnly={!this.state.editEmail}
                value={this.state.email ? this.state.email : ""}
                onChange={e => this.setState({ email: e.target.value })}
                isInvalid={!!this.state.errEmail}
              />
              <Form.Control.Feedback type='invalid'>
                {this.state.errEmail}
              </Form.Control.Feedback>
            </div>
          </div>
          <div className='row border pl-3'>
            <div className='col my-2'>
              <strong className='row'>Mobile Phone Number:</strong>
              <Form.Control
                plaintext={!this.state.phoneEdit}
                readOnly={!this.state.phoneEdit}
                value={this.state.phone ? this.state.phone : ""}
                onChange={e => this.setState({ phone: e.target.value })}
                isInvalid={!!this.state.errPhone}
              />
              <Form.Control.Feedback type='invalid'>
                {this.state.errPhone}
              </Form.Control.Feedback>
            </div>
            {this.state.phoneEdit ? (
              <FaCheck
                style={{
                  backgroundColor: "#3b3",
                  borderBottomLeftRadius: 8,
                  padding: 5,
                  cursor: "pointer"
                }}
                size={"35px"}
                onClick={() => {
                  if (this.validatePhone()) this.setState({ phoneEdit: false });
                }}
              />
            ) : (
              <FaPencilAlt
                style={{
                  backgroundColor: "#bbb",
                  borderBottomLeftRadius: 8,
                  padding: 5,
                  cursor: "pointer"
                }}
                size={"35px"}
                onClick={() => this.setState({ phoneEdit: true })}
              />
            )}
          </div>
          <div className='row border pl-3'>
            <div className='col my-2'>
              <strong className='row'>Date of Birth:</strong>
              <Form.Control
                type='date'
                pattern='[0-3][0-9]\/[0-1][0-9]\/[0-9]{4}'
                plaintext={!this.state.editDate}
                readOnly={!this.state.editDate}
                value={this.state.date ? this.state.date : ""}
                onChange={e => this.setState({ date: e.target.value })}
                isInvalid={!!this.state.errDate}
              />
              <Form.Control.Feedback type='invalid'>
                {this.state.errDate}
              </Form.Control.Feedback>
            </div>
            {this.state.editDate ? (
              <FaCheck
                style={{
                  backgroundColor: "#3b3",
                  borderBottomLeftRadius: 8,
                  padding: 5,
                  cursor: "pointer"
                }}
                size={"35px"}
                onClick={() => {
                  if (this.validateDate()) this.setState({ editDate: false });
                }}
              />
            ) : (
              <FaPencilAlt
                style={{
                  backgroundColor: "#bbb",
                  borderBottomLeftRadius: 8,
                  padding: 5,
                  cursor: "pointer"
                }}
                size={"35px"}
                onClick={() => this.setState({ editDate: true })}
              />
            )}
          </div>
          <div className='row border pl-3'>
            <div className='col my-2'>
              <strong className='row'>Password:</strong>
              <Form.Control
                plaintext={!this.state.editPassword}
                readOnly={!this.state.editPassword}
                value={this.state.password ? this.state.password : ""}
                onChange={e => this.setState({ password: e.target.value })}
                isInvalid={!!this.state.errPassword}
              />
              <Form.Control.Feedback type='invalid'>
                {this.state.errPassword}
              </Form.Control.Feedback>
            </div>
            {this.state.editPassword ? (
              <FaCheck
                style={{
                  backgroundColor: "#3b3",
                  borderBottomLeftRadius: 8,
                  padding: 5,
                  cursor: "pointer"
                }}
                size={"35px"}
                onClick={() => {
                  if (this.validatePassword())
                    this.setState({ editPassword: false });
                }}
              />
            ) : (
              <FaPencilAlt
                style={{
                  backgroundColor: "#bbb",
                  borderBottomLeftRadius: 8,
                  padding: 5,
                  cursor: "pointer"
                }}
                size={"35px"}
                onClick={() => this.setState({ editPassword: true })}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  async validateName() {
    if (!this.state.name) {
      this.setState({ errName: "Required" });
      return false;
    }
    return await axios
      .put(API_URL + "api/s/name?name=" + this.state.name)
      .then(result => {
        Authentication.updateUser("name", this.state.name);
        this.props.changeName(this.state.name);
        return true;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  }

  validateEmail() {
    if (!this.state.email) {
      this.setState({ errEmail: "Required" });
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
      this.setState({ errEmail: "Invalid email" });
      return false;
    }
    return true;
  }

  async validatePhone() {
    if (!this.state.phone) {
      this.setState({ errPhone: "Required" });
      return false;
    }
    return await axios
      .put(API_URL + "api/s/phone?phone=" + this.state.phone)
      .then(result => {
        Authentication.updateUser("phone", this.state.phone);
        return true;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  }

  async validateDate() {
    if (!this.state.date) {
      this.setState({ errDate: "Required" });
      return false;
    }
    return await axios
      .put(API_URL + "api/s/birthdate?birthdate=" + this.state.date)
      .then(result => {
        Authentication.updateUser("birthdate", this.state.date);
        return true;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  }

  async validatePassword() {
    if (!this.state.password) {
      this.setState({ errPassword: "Required" });
      return false;
    }
    return await axios
      .put(API_URL + "api/s/password?password=" + this.state.password)
      .then(result => {
        return true;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  }
}
