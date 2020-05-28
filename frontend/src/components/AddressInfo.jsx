import React from "react";

import { AddressPopup } from "./AddressPopup";
import { FaPencilAlt } from "react-icons/fa";
import axios from "axios";

export class AddressInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      selected: [],
      address: { name: "", country: "", region: "", address: "" },
      showPopup: false,
      popupTitle: ""
    };

    this.openAdd = this.openAdd.bind(this);
    this.submitNew = this.submitNew.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  componentDidMount() {
    this.initApp();
  }

  async initApp() {
    axios
      .get("http://localhost:8080/api/address")
      .then(response => {
        this.setState({ addresses: response.data.content });
      })
      .catch(err => console.log(err));
    this.setState({ showPopup: false });
  }

  openEdit(index) {
    this.setState({ address: this.state.addresses[index] }, () =>
      this.setState({
        showPopup: true,
        popupTitle: "Edit Address",
        currentIndex: index
      })
    );
  }

  submitEdit(address) {
    var oldAddress = this.state.addresses[this.state.currentIndex];
    for (var key in address) oldAddress[key] = address[key];

    const requestOptions = {
      headers: { "Content-Type": "application/json" }
    };
    axios
      .put(
        "http://localhost:8080/api/address/" + oldAddress.id,
        oldAddress,
        requestOptions
      )
      .then(result => {
        this.state.addresses[this.state.currentIndex] = oldAddress;

        this.setState({ showPopup: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  openAdd() {
    this.setState(
      {
        address: { name: "", country: "", region: "", address: "" }
      },
      () =>
        this.setState({
          showPopup: true,
          popupTitle: "Add Address"
        })
    );
  }

  submitNew(address) {
    const requestOptions = {
      headers: { "Content-Type": "application/json" }
    };
    axios
      .post("http://localhost:8080/api/address", address, requestOptions)
      .then(result => {
        this.initApp();
      })
      .catch(err => console.log(err));
  }

  deleteSelected(selected) {
    var data = [];
    for (var s = 0; s < selected.length; s++) {
      if (selected[s] == true) {
        data.push(this.state.addresses[s].id);
      }
    }
    this.setState({ selectAll: false });
    const requestOptions = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    axios
      .delete(
        "http://localhost:8080/api/address?ids=" + data.join(","),
        requestOptions
      )
      .then(result => {
        var addresses = this.state.addresses;
        var deleted_count = 0;
        for (var s = 0; s < selected.length; s++) {
          if (selected[s] == true) {
            addresses.splice(s - deleted_count++, 1);
          }
        }
        this.setState({ addresses });
        selected.splice(0, selected.length);
        this.setState({ selected });
      })
      .catch(err => {
      });
  }

  render() {
    var addresses = this.state.addresses.map((element, index) => (
      <div key={index} className='row border'>
        <input
          style={{ width: 20, height: 20, margin: 7 }}
          type='checkbox'
          checked={this.state.selected[index] == true ? true : false}
          onChange={event => {
            var selected = [...this.state.selected];
            selected[index] = event.target.checked;
            this.setState({ selected });
          }}
          className=' my-auto'
        />
        <div className='col ml-2'>
          <div className='row'>
            <strong>Name: </strong> {element.name}
          </div>
          <div className='row'>
            <strong>Contry: </strong>
            {element.country}
          </div>
          <div className='row'>
            <strong>Region: </strong>
            {element.region}
          </div>
        </div>
        <div className='col'>
          <div className='row'>
            <strong>Description: </strong> {element.address}
          </div>
        </div>
        <FaPencilAlt
          style={{
            backgroundColor: "#bbb",
            borderBottomLeftRadius: 8,
            padding: 5,
            cursor: "pointer"
          }}
          size={"35px"}
          onClick={() => this.openEdit(index)}
        />
      </div>
    ));
    return (
      <div className='container my-5'>
        <h4>Addresses</h4>
        <br />
        <div className='col'>
          <div className='row pl-0 mb-3'>
            <input
              style={{ width: 20, height: 20, margin: 7 }}
              type='checkbox'
              className=' my-auto'
              value={this.state.selectAll}
              onChange={event => {
                var selected = new Array(this.state.addresses.length);
                selected.fill(event.target.checked);
                this.setState({ selectAll: event.target.checked, selected });
              }}
            />
            <div className='col pl-0 ml-0'>Select All</div>
            <div style={{ color: "#00f" }} className='float-right mr-4'>
              <a
                href='#'
                onClick={() => this.deleteSelected(this.state.selected)}
              >
                Remove Selected Addresses
              </a>
            </div>
          </div>
        </div>
        {addresses}
        <button
          className='btn btn-primary float-left mt-3 px-3'
          type='button'
          onClick={this.openAdd}
        >
          Add
        </button>
        <AddressPopup
          mtitle={this.state.popupTitle}
          address={this.state.address}
          show={this.state.showPopup}
          onHide={() => this.setState({ showPopup: false })}
          submitNew={this.submitNew}
          submitEdit={this.submitEdit}
        />
      </div>
    );
  }
}
