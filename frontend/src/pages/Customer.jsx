import React from 'react';

import styles from '../app.sass';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { SellerOrders } from '../components/SellerOrders';
import { AccountInfo } from '../components/AccountInfo';
import { AddressInfo } from '../components/AddressInfo';
import { HelpMessage } from '../components/HelpMessage';

const selectedColor = '#11f';

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'profile',
      customer: {},
      show: false
    };
    this.changeName = this.changeName.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  componentDidMount() {
    this.props.routeChange('customer');
    this.setState({ customer: this.props.customer });
  }

  componentWillReceiveProps(props) {
    this.setState({ customer: props.customer });
  }

  changeName(name) {
    var customer = this.state.customer;
    customer['name'] = name;
    this.setState({ customer });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  renderPage() {
    switch (this.state.page) {
      case 'profile':
        return (
          <AccountInfo
            customer={this.state.customer}
            changeName={this.changeName}
          />
        );
      case 'orders':
        return <SellerOrders />;
      case 'addresses':
        return <AddressInfo />;
      case 'notification':
        return <AccountInfo />;
      case 'help':
        return <HelpMessage />;
      default:
        return <AccountInfo />;
    }
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: '#ccc'
        }}
        className='pb-5'
      >
        <div className='container pt-5'>
          <div className='row'>
            <div
              style={{ backgroundColor: '#fff' }}
              className='col-3 mr-4 pt-4'
            >
              <h4 className='text-center border border-dark'>
                {this.state.customer.name}
              </h4>
              <br />
              <br />
              <h5
                className={styles.link}
                style={{
                  color: this.state.page === 'profile' ? selectedColor : null
                }}
                onClick={() => this.setState({ page: 'profile' })}
              >
                Profile
              </h5>
              <h5
                className={styles.link}
                style={{
                  color: this.state.page === 'orders' ? selectedColor : null
                }}
                onClick={() => this.setState({ page: 'orders' })}
              >
                Orders
              </h5>
              <h5
                className={styles.link}
                style={{
                  color: this.state.page === 'addresses' ? selectedColor : null
                }}
                onClick={() => this.setState({ page: 'addresses' })}
              >
                Addresses
              </h5>
              <h5
                className={styles.link}
                style={{
                  color:
                    this.state.page === 'notification' ? selectedColor : null
                }}
                onClick={() => this.setState({ page: 'notification' })}
              >
                Notifications
              </h5>
              <br />
              <br />
              <hr />
              <h5
                className={styles.link}
                style={{
                  color: this.state.page === 'help' ? selectedColor : null
                }}
                onClick={() => this.setState({ page: 'help' })}
              >
                Help
              </h5>
              <hr />
              <h5
                className={styles.link}
                onClick={() => this.setState({ show: true })}
              >
                Logout
              </h5>
              <Modal
                aria-labelledby='contained-modal-title-vcenter'
                centered
                show={this.state.show}
                onHide={this.handleClose}
              >
                <Modal.Body style={{ fontSize: 30, alignSelf: 'center' }}>
                  Are You Sure?
                  <br />
                  <Button
                    style={{
                      fontSize: 20,
                      backgroundColor: '#384E6E',
                      color: 'white',
                      justifyContent: 'center',
                      marginRight: 40
                    }}
                    variant='primary'
                    onClick={() => {
                      this.props.history.push('/');
                    }}
                  >
                    YES
                  </Button>
                  <Button
                    style={{
                      fontSize: 20,
                      backgroundColor: 'red',
                      color: 'white',
                      justifyContent: 'center',
                      marginLeft: 40
                    }}
                    variant='secondary'
                    onClick={this.handleClose}
                  >
                    NO
                  </Button>
                </Modal.Body>
              </Modal>
              <br />
            </div>
            <div style={{ backgroundColor: '#fff' }} className='col'>
              {this.renderPage()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Customer;