import React from 'react';

import styles from '../app.sass';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { SellerOrders } from '../components/SellerOrders';
import { SellerProducts } from '../components/SellerProducts';
import { AccountInfo } from '../components/AccountInfo';
import { AddressInfo } from '../components/AddressInfo';
import { HelpMessage } from '../components/HelpMessage';

const selectedColor = '#11f';

class Seller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'profile',
      seller: {},
      show: false
    };

    this.changeName = this.changeName.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  componentDidMount() {
    this.props.routeChange('seller');
  }

  changeName(name) {
    var seller = this.state.seller;
    seller['name'] = name;
    this.setState({ seller });
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
            seller={this.state.seller}
            changeName={this.changeName}
          />
        );
      case 'orders':
        return <SellerOrders />;
      case 'addresses':
        return <AddressInfo />;
      case 'products':
        return <SellerProducts seller={'umut@gmail.com'} />; //TODO fix it
      case 'help':
        return <HelpMessage />;
      default:
        return <AccountInfo />;
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ seller: props.seller });
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: '#ccc'
        }}
        className='pb-5 pt-5'
      >
        <div className='container pt-5 pb-5'>
          <div className='row'>
            <div
              style={{ backgroundColor: '#fff', minHeight: 600 }}
              className='col-3 mr-4 pt-4'
            >
              <h4 className='text-center border border-dark'>
                {this.state.seller.name}
              </h4>
              <h4 className='text-center border border-dark'>
                {this.state.seller.companyName}
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
                  color: this.state.page === 'products' ? selectedColor : null
                }}
                onClick={() => this.setState({ page: 'products' })}
              >
                Products
              </h5>{' '}
              <h5
                className={styles.link}
                style={{
                  color:
                    this.state.page === 'notifications' ? selectedColor : null
                }}
                onClick={() => this.setState({ page: 'notifications' })}
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
                onClick={() => {
                  this.props.logout();
                  this.setState({ show: true });
                  this.props.history.push('/');
                }}
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
                  ARE YOU SURE?
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

export default Seller;